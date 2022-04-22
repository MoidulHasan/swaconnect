const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        select: true,
        unique: false,
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        select: true,
        unique: [true, "User name already exist"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
        minLength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: {
            values: [
                "Admin",
                "Operations",
                "Support Manager",
                "Support Lavel 1",
                "Distributor",
                "Master Agent",
                "Agen",
            ],
            message: "Your input user role is not correct",
        },
        required: [true, "User role is required"],
        select: true,
    },
    active: {
        type: Boolean,
        default: true,
        select: true,
    },
    loginStatus: {
        type: Boolean,
        default: false,
        select: true,
    },
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre("save", async function(next) {
    // check the password if it is modified
    if (!this.isModified("password")) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function(
    typedPassword,
    originalPassword
) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

// error handling middleware
const handleError = (error, doc, next) => {
    if (error.code === 11000) {
        let errors = [];

        Object.keys(error.keyValue).forEach((key) => {
            const errMessage = `${key} ${error.keyValue[key]} is already exist`;
            errors.push(errMessage);
        });
        const err = new AppError(
            400,
            "bad request",
            "There is some problem with your request"
        );
        err.message = errors;
        next(err);
    } else if (err.name === "ValidationError") {
        // take all error to errors object
        let errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });

        const err = {
            name: "customError",
            statusCode: 400,
            status: "bad request",
            message: "Please provide all required filed",
            errors: errors,
        };

        next(err);
    } else {
        next();
    }
};

// add error handling middleware after operation
userSchema.post("save", handleError);
userSchema.post("update", handleError);
userSchema.post("findOneAndUpdate", handleError);
userSchema.post("insertMany", handleError);

const User = mongoose.model("User", userSchema);
module.exports = User;