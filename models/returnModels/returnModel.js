// dependencies
const mongoose = require("mongoose");


// schema schafoldig
const returnSchema = mongoose.Schema({
    returnReason: {
        type: String,
        required: [true, "return reason is required"],
        select: true,
    },
    returnDate: {
        type: Date,
        required: [true, "return date is required"],
        select: true,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agents",
        required: [true, "agent id is required"],
        select: true,
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distributors",
        required: [true, "distributor id is required"],
        select: true,
    },
    item: [{
        type: String,
        required: [true, "item name is required"],
        select: true,
    }],
    ssid: {
        type: String,
        /**
         * !need to be confiremed
         * required: [true, "ssid is required"], 
         * **/
        select: true,
        unique: true,
    },
    deviceSerialNumber: {
        type: String,
        /**
         * !need to be confiremed
         * required: [true, "ssid is required"], 
         * **/
        select: true,
        unique: true,
    },
    EMEI1: {
        type: String,
        /**
         * !need to be confiremed
         * required: [true, "ssid is required"], 
         * **/
        select: true,
        unique: true,
    },
    EMEI2: {
        type: String,
        /**
         * !need to be confiremed
         * required: [true, "ssid is required"], 
         * **/
        select: true,
        unique: true,
    },
    shippingMethod: {
        type: String,
        required: [true, "shipping method is required"],
        select: true,
    },
    trackingNumber: {
        type: Number,
        /**
         * !need to be confiremed
         * required: [true, "ssid is required"], 
         * **/
        select: true,
    },
    receptionStatus: {
        type: String,
        required: [true, "reception status is required"],
        select: true,
    },
    receptionDate: {
        type: Date,
        required: [true, "reception date is required"],
        select: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        select: false,
    }],
});

// export model
const returns = mongoose.model("Returns", returnSchema);
module.exports = returns;