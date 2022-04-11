// Dependencies
const mongoose = require("mongoose");
const validator = require("validator");
const AppError = require("../../controllers/error/appError");

// Schema scafolding
const applicationSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "User id is required"],
        unique: true,
        select: true,
        default: 5000001,
    },
    firstName: {
        type: String,
        required: [true, "Applicants first name is required"],
        selct: true,
    },
    lastName: {
        type: String,
        required: [true, "Applicants last name is required"],
        selct: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Applicants phone number is required"],
        select: true,
        unique: [true, "One application already submited by this phone number"]
    },
    email: {
        type: String,
        required: [true, "applicants email is required"],
        select: true,
        lowercase: true,
        unique: [true, "One application already submitted by this email"],
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    address: {
        type: String,
        required: [true, "applicants address is required"],
        select: true,
    }
});



// error handling middleware
const handleError = (error, doc, next) => {
    // console.log(Object.keys(error));

    // console.log("error new: ", error.code);
    if (error.code === 11000) {
        const err = {
            name: "customError",
            statusCode: 400,
            status: "bad request",
            message: "This email or phone is already registerd"
        }
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
        }

        next(err);
    } else {
        next();
    }
};


applicationSchema.post('save', handleError);
applicationSchema.post('update', handleError);
applicationSchema.post('findOneAndUpdate', handleError);
applicationSchema.post('insertMany', handleError);

// export model
const Application = mongoose.model("Applications", applicationSchema);
module.exports = Application;