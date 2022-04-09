// dependencies
const mongoose = require("mongoose");
const customValidator = require("../../utilities/validator");



// Define sim card schema
const simCardSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Sim card id is required"],
        unique: true,
        select: true,
        default: "100001",
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
        ref: "user",
        required: [true, "SIM Card User Name Required"],
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendor",
        select: true,
    },
    simOrderNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimCardOrder",
        select: false,
    },
    simCardCompatibility: {
        /**
         * !have to know more about it
         */
        type: String,
        select: true,
    },
    simOperations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimOperations"
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
        ref: "Distributor"
    },
    agent: {
        /**
         * !need to confirmed when agent will be added, at the begining of adding sim card or at any time
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
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
        ref: "Return"
    },
    simOperationsLog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimOperationsLog",
        // required: true,
        select: false
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes",
        select: false
    }]
}, { _id: false });



const SimCard = mongoose.model("SimCard", simCardSchema);
module.exports = SimCard;