/**
 * Title: Auth Controler
 * Descriptions: Provide controler for login and authenticatication
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const AppError = require('../error/appError');


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



auth.login = async(req, res, next) => {
    try {
        console.log("login controler")
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
        const token = createToken(user.id);

        // Remove the password from the output
        user.password = undefined;

        res.status(200).json({
            status: "success",
            token,
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

// export module
module.exports = auth;