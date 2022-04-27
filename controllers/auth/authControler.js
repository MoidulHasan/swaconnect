/**
 * Title: Auth Controler
 * Descriptions: Provide controler for login and authenticatication
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const AppError = require("../error/appError");
const User = require("../../models/userModels/userModel");
const { isEmailValid } = require("../../utilities/utils");
const logger = require("../../utilities/logger");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// module scafolding
const auth = {};

auth.createToken = (id) => {
    return jwt.sign({
        id,
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }
    );
};

// login controler
auth.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) check if email and password exist
        if (!email || !password) {
            return next(
                new AppError(
                    404,
                    "login failed",
                    "Please provide currect email and password"
                ),
                req,
                res,
                next
            );
        }

        // 2) check if user exist and password is correct
        const user = await User.findOne({
            email,
        }).select("+password");

        console.log(user);

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(
                new AppError(401, "Login Failed", "Email or Password is wrong"),
                req,
                res,
                next
            );
        }

        // console.log(user);
        // 3) All correct, send jwt to client
        const token = auth.createToken(user._id);

        // 4) make login status true in database
        User.findByIdAndUpdate(
            user.id, { loginStatus: true },
            function (err, docs) {
                if (err) {
                    logger.error(err);
                } else {
                    // make login status true in user object
                    user.loginStatus = true;

                    // Remove the password from the output
                    user.password = undefined;

                    res.status(200).json({
                        status: "success",
                        userId: user._id,
                        userName: user.userName,
                        role: user.role,
                        token,
                    });
                }
            }
        );
    } catch (err) {
        next(err);
    }
};

// Signup controler
auth.signup = async (req, res, next) => {
    try {
        // 1) validate user input
        const fullName =
            typeof req.body.fullName === "string" && req.body.fullName.length > 0 ?
                req.body.fullName :
                false;
        const userName =
            typeof req.body.userName === "string" && req.body.userName.length > 0 ?
                req.body.userName :
                false;
        const email =
            typeof req.body.email === "string" &&
                req.body.email.length > 0 &&
                isEmailValid(req.body.email) ?
                req.body.email :
                false;
        const password =
            typeof req.body.password === "string" && req.body.password.length > 0 ?
                req.body.password :
                false;
        const role =
            typeof req.body.role === "string" && req.body.role.length > 0 ?
                req.body.role :
                false;
        const active =
            typeof req.body.active === "boolean" ? req.body.active : false;
        const loginStatus = false;

        if (fullName && userName && email && password && role && active) {
            // 2) check and response if user exist
            const userStatus = await User.findOne({ email });
            if (userStatus) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "This email is already registered",
                });
            } else {
                // 3) create user object
                const userObj = {
                    fullName,
                    userName,
                    email,
                    password,
                    role,
                    active,
                    loginStatus,
                };

                // 4) create user
                const user = await User.create(userObj);

                // 5) check and response success if user is inserted to database
                if (user) {
                    user.password = undefined;

                    res.status(201).json({
                        status: "success",
                        data: {
                            user,
                        },
                    });
                } else {
                    // 6) if user is not inserted
                    res.status(500).json({
                        status: "server error",
                        message: "There is an internal server error, please try agein letter.",
                    });
                }
            }
        } else {
            const err = new AppError(
                400,
                "bad request",
                "You have problem with your input data"
            );
            next(err);
        }
    } catch (err) {
        if (err.name === "AppError") {
            err.name = undefined;
            next(err);
        } else {
            logger.error(err.errors);
            const error = new AppError(
                500,
                "Server Error",
                "There is an internal server error, please try again letter"
            );
            next(error);
        }
    }
};

// protector function for private routes
auth.authenticator = async (req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "You are not logged in! Please login in to continue1"
                ),
                req,
                res,
                next
            );
        }

        // 2) Verify token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // 3) check if the user is exist (not deleted)
        const user = await User.findById(decode.id);
        if (!user) {
            return next(
                new AppError(401, "fail", "This user is no longer exist"),
                req,
                res,
                next
            );
        }

        // console.log(user);
        // 4) check if user is logedin or not
        if (!user.loginStatus) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "You are not logged in! Please login in to continue2"
                ),
                req,
                res,
                next
            );
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

auth.logout = async (req, res, next) => {
    // make login status false in database
    User.findByIdAndUpdate(
        req.user.id, { loginStatus: false },
        function (err, docs) {
            if (err) {
                logger.error(err);
            } else {
                // console.log("updated data", docs)
                // make login status true in user object
                req.user.loginStatus = false;

                // Remove the password from the output
                req.user.password = undefined;

                res.status(200).json({
                    status: "success",
                    data: {
                        message: "logout successfully",
                    },
                });
            }
        }
    );
};

// export module
module.exports = auth;