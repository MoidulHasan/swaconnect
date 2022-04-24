// dependencies
const mongoose = require("mongoose");
const customValidator = require("../../utilities/validator");
const AppError = require("../../controllers/error/appError");

// Define sim card schema
const simCardSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Sim card id is required"],
        unique: true,
        select: true,
        default: 700001,
    },
    SSID: {
        type: String,
        required: [true, "Please fill Sim Card SSID"],
        select: true,
        unique: true,
        validate: customValidator.isNonZeroLengthString,
    },
    serviceCarrier: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Service Carrier Id is Required"],
        ref: "servicecarrier",
        select: false,
    },
    PUK1: {
        type: String,
        required: [true, "Please fill PUK1 id"],
        select: true,
        validate: customValidator.isNonZeroLengthString,
    },
    createdDate: {
        type: Date,
        required: [true, "SIM Card Created Date Required"],
        select: true,
        default: Date.now(),
    },
    simStatus: {
        type: String,
        required: true,
        enum: ["Blank", "Active", "Hotline"],
        default: "Blank",
        select: true,
    },
    statusDate: {
        type: Date,
        required: true,
        select: true,
        default: Date.now("dd/mm/yyyy"),
    },
    MDN: {
        type: String,
        // required: [true, "SIM Card MDN Required"],
        select: true,
        unique: false,
    },
    userName: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: [true, "User Name Required"],
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        select: true,
    },
    orderNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimCardOrder",
        select: false,
    },
    compatibility: {
        /**
         * !have to know more about it
         */
        type: String,
        select: true,
    },
    operations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimOperations",
    },
    /**
     * !field name changed to physicalStatus from good/bad, need to inform
     */
    physicalStatus: {
        type: String,
        enum: ["Good", "Bad"],
        required: [true, "sim card physical status required"],
        select: true,
    },
    distributor: {
        /**
         * !need to confirmed when distributor will be added, at the begining of adding sim card or at any time
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distributor",
    },
    agent: {
        /**
         * !need to confirmed when agent will be added, at the begining of adding sim card or at any time
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
    },
    applicationNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    phonePlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "phonePlan",
    },
    returns: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Return",
    },
    simOperationsLog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimOperationsLog",
        // required: true,
        select: false,
    },],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
        select: false,
    },],
});

// error handling middleware
const handleError = (error, doc, next) => {
    console.log(error)
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
    } else if (error.name === "ValidationError") {
        // take all error to errors object
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
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
simCardSchema.post("save", handleError);
simCardSchema.post("update", handleError);
simCardSchema.post("findOneAndUpdate", handleError);
simCardSchema.post("insertMany", handleError);

const SimCard = mongoose.model("SimCard", simCardSchema);
module.exports = SimCard;