// Dependencies
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


// schema schafolding
const serviceCarrierSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Service carrier id is required"],
        unique: true,
        select: true,
        default: 101,
    },
    label: {
        type: String,
        required: [true, "service carrier label is required"],
        select: true,
    },
    name: {
        type: String,
        required: [true, "service carrear name is required"],
        select: true,
        unique: true,
    },
    createdDate: {
        type: Date,
        required: [true, "service carrear creation date is required"],
        select: true,
        default: Date.now(),
    },
    contactName: {
        type: String,
        required: [true, "service carrear contact name is required"],
        select: true,
    },
    contactPhone: {
        type: String,
        required: [true, "service carrear contact phone is required"],
        select: true,
    },
    contactEmail: {
        type: String,
        required: [true, "service carrear contact email is required"],
        unique: true,
        lowercase: true,
        validate: [
            validator.isEmail,
            " Please provide a valid service carrear contact email",
        ],
    },
    files: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
            select: false,
        },
    ],
    apiUserName: {
        type: String,
        required: [true, "API user name is required"],
        select: false,
    },
    apiTokenPassword: {
        type: String,
        required: [true, "API password is required"],
        select: false,
    },
    clecid: {
        type: String,
        required: [true, "CLIECID is required"],
        select: false,
    },
    apiPin: {
        type: String,
        required: [true, "API pin is required"],
        select: false,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
            select: true,
        },
    ],
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        select: true,
    },
    supportName: {
        type: String,
        required: [true, "Service carreir support name is required"],
        select: true,
        unique: false,
    },
    supportPhone: {
        type: String,
        required: [true, "Service carreir support phone is required"],
        select: true,
    },
    supportEmail: {
        type: String,
        required: [true, "Service carreir support email is required"],
        select: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phonePlans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PhonePlan",
        },
    ],
});






// error handling middleware
const handleError = (error, doc, next) => {
    // console.log(Object.keys(error));

    console.log("error new: ", error);
    if (error.code === 11000) {
        const err = {
            name: "customError",
            statusCode: 400,
            status: "bad request",
            message: "This fields are already registerd",
            fields: error.keyValue,
        };
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
serviceCarrierSchema.post("save", handleError);
serviceCarrierSchema.post("update", handleError);
serviceCarrierSchema.post("findOne", handleError);
serviceCarrierSchema.post("findOneAndUpdate", handleError);
serviceCarrierSchema.post("insertMany", handleError);

// export model
const serviceCarrier = mongoose.model("serviceCarrier", serviceCarrierSchema);
module.exports = serviceCarrier;
