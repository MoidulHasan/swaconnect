/**
 * Title: Auth Controler
 * Descriptions: Provide controler for login and authenticatication
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const AppError = require('../error/appError');
const User = require('../../models/userModel');
const { isEmailValid } = require('../../utilities/utils');
const logger = require('../../utilities/logger')
const jwt = require('jsonwebtoken');
const { promisify } = require("util");


// module scafolding
const auth = {};

auth.createToken = id => {
    return jwt.sign({
            id,
        },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};


// login controler
auth.login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) check if email and password exist
        if (!email || !password) {
            return next(
                new AppError(404, "login failed", "Please provide currect email and password"),
                req,
                res,
                next,
            );
        }

        // 2) check if user exist and password is correct
        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(
                new AppError(401, "Login Failed", "Email or Password is wrong"),
                req,
                res,
                next,
            );
        }

        // 3) All correct, send jwt to client
        const token = auth.createToken(user.id);

        // 4) make login status true in database
        User.findByIdAndUpdate(user.id, { loginStatus: true },
            function(err, docs) {
                if (err) {
                    logger.error(err);
                } else {
                    // make login status true in user object
                    user.loginStatus = true;

                    // Remove the password from the output
                    user.password = undefined;

                    res.status(200).json({
                        status: "success",
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
auth.signup = async(req, res, next) => {
    try {
        // validate user input
        const name = typeof(req.body.name) === 'string' && req.body.name.length > 0 ? req.body.name : false;
        const email = typeof(req.body.email) === 'string' && req.body.email.length > 0 && isEmailValid(req.body.email) ? req.body.email : false;
        const password = typeof(req.body.password) === 'string' && req.body.password.length > 0 ? req.body.password : false;
        const role = typeof(req.body.role) === 'string' && req.body.role.length > 0 ? req.body.role : false;
        const active = typeof(req.body.active) === 'boolean' ? req.body.active : false;
        const loginStatus = false;

        if (name && email && password && role && active) {
            // 2) check if user exist
            const userStatus = await User.findOne({ email, });
            if (userStatus) {
                res.status(400).json({
                    status: "Bad Request",
                    message: "This email is already registered"
                });
            } else {
                // create user object
                const userObj = {
                    name,
                    email,
                    password,
                    role,
                    active,
                    loginStatus,
                };

                // create user
                const user = await User.create(userObj);

                user.password = undefined;

                res.status(201).json({
                    status: "success",
                    data: {
                        user,
                    },
                });
            }
        } else {
            const err = new AppError(400, "bad request", "You have problem with your input data");
            next(err);
        }


    } catch (err) {
        logger.error(err);
        const error = new AppError(500, "Server Error", "There is an internal server error, please try again letter");
        next(error);
    }
};

// protector function for private routes
auth.authenticator = async(req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "You are not logged in! Please login in to continue1",
                ),
                req,
                res,
                next,
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
                next,
            );
        }

        console.log(user);
        // 4) check if user is logedin or not
        if (!user.loginStatus) {
            return next(
                new AppError(401, "fail", "You are not logged in! Please login in to continue2"),
                req,
                res,
                next,
            );
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};


auth.logout = async(req, res, next) => {
    // make login status false in database
    User.findByIdAndUpdate(req.user.id, { loginStatus: false },
        function(err, docs) {
            if (err) {
                logger.error(err);
            } else {
                console.log("updated data", docs)
                    // make login status true in user object
                req.user.loginStatus = false;

                // Remove the password from the output
                req.user.password = undefined;

                res.status(200).json({
                    status: "success",
                    data: {
                        message: "logout successfully"
                    },
                });
            }
        }
    );
}

// export module
module.exports = auth;