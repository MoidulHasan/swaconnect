// dependencies
const mongoose = require("mongoose");
const customValidator = require("../../utilities/validator");



// Define sim card schema
const simCardSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        select: true,
        default: "1001",
    },
    SSID: {
        type: String,
        required: [true, "Please fill Sim Card SSID"],
        select: true,
        unique: true,
        validate: customValidator.isNonZeroLengthString,
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
    },
    MDN: {
        type: String,
        required: [true, "SIM Card MDN Required"],
        select: true,
        unique: true,
    },
    userName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "SIM Card User Name Required"],
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        select: true,
    },
    simOrderNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "simCardOrders",
        select: false,
    },
    simCardCompatibility: {
        type: String,
        select: true,
    },
    simOperations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "simOperations"
    },
    physicalStatus: {
        type: String,
        enum: ["Good", "Bad"],
        required: [true, "sim card physical status required"],
        select: true,
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distributors"
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agents"
    },
    applicationNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    customerFirstName: {
        type: String,
        required: [true, "Customer First Name Required"],
        select: true,
    },
    customerLastName: {
        type: String,
        required: [true, "Customer Last Name Required"],
        select: true,
    },
    phonePlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "phonePlans"
    },
    returns: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "returns"
    },
    simOperationsLog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "simOperationsLogs",
        // required: true,
        select: false
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes",
        select: false
    }]
}, { _id: false });



const SimCard = mongoose.model("SimCard", simCardSchema);
module.exports = SimCard;