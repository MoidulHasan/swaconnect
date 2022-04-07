const mongoose = require("mongoose");

const simCardSchema = new mongoose.Schema({
    SSID: {
        type: String,
        required: [true, "Please fill Sim Card SSID"],
        select: true,
    },
    PUK1: {
        type: String,
        required: [true, "Please fill PUK1 id"],
        select: true,
    },
    Created_date: {
        type: Date,
        // required: [true, "SIM Card Created Date Required"],
        select: true,
    },
    SIM_Status: {
        type: String,
        enum: ["Blank", "Active", "Hotline"],
        default: "Blank",
        select: true,
    },
    Status_Date: {
        type: Date,
        // required: true,
        select: true,
    },
    MDN: {
        type: String,
        required: [true, "SIM Card MDN Required"],
        select: true,
    },
    User_Name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "SIM Card User Name Required"],
    },
    Vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        // required: [true, "SIM Card Vendor Name Required"],
        select: true,
    },
    Sim_Order_Number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sim_Card_Order",
        // required: [true, "SIM Order Number Required"],
        select: false,
    },
    Sim_Card_Compatibility: {
        type: String,
        // required: [true, "SIM Card Compatibility Required"],
    },
    Sim_Operations: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimOperations"
    },
    Physical_Status: {
        type: String,
        enum: ["Good", "Bad"],
        select: true,
    },
    Distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distributor"
    },
    Agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    },
    Application_number: {
        type: String,
        // required: [true, "Application Number Required"],
    },
    Customer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    Customer_First_Name: {
        type: String,
        // required: [true, "Customer First Name Required"],
    },
    Customer_Last_Name: {
        type: String,
        // required: [true, "Customer Last Name Required"],
    },
    Phone_Plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Phone_Plans"
    },
    Returns: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Returns"
    },
    SIM_Operations_Log: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Returns"
    }],
    Notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }]
});


const SimCard = mongoose.model("SimCard", simCardSchema);
module.exports = SimCard;