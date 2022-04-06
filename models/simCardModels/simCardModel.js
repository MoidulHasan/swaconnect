const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const simCardSchema = new mongoose.Schema({
    SSID: {
        type: String,
        required: [true, "Please fill Sim Card SSID"],
    },
    PUK1: {
        type: String,
        required: [true, "Please fill PUK1 id"],
    },
    Created_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    SIM_Status: {
        type: String,
        enum: ["Blank", "Active", "Hotline"],
        default: "Blank",
    },
    Status_Date: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const User = mongoose.model("SimCard", simCardSchema);
module.exports = User;