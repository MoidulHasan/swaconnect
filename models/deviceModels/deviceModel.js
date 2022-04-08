// dependencies
const mongoose = require("mongoose");


// schema schafolding
const deviceSchema = mongoose.Schema({
    _id: {
        type: String,
        required: [true, "device id is required"],
        unique: true,
        select: true,
        default: "200001",
    },
    deviceType: {
        type: String,
        required: [true, "device type is required"],
        select: true,
    },
    fccApprovalStatus: {
        /**
         * ! have some confussion
         */
    },
    fccApprovalName: {
        /**
         * ! have some confussion
         */
    },
    fccApprovalDate: {
        /**
         * ! have some confussion
         */
        type: Date,
        required: [true, "fcc approval date is required"],
    },
    IMEI1: {
        type: String,
        required: [true, "imei1 is required"],
        select: true,
    },
    IMEI2: {
        type: String,
        required: [true, "imei1 is required"],
        select: true,
    },
    IMEI3: {
        type: String,
        required: [true, "imei1 is required"],
        select: true,
    },
    serialNumber: {
        type: String,
        required: [true, "device serial number is required"],
        unique: true,
        select: true,
    },
    color: {
        type: String,
        required: [true, "device color is required"],
        select: true,
    },
    model: {
        type: String,
        required: [true, "device model is required"],
        select: true,
    },
    network: {
        type: String,
        required: [true, "supported network type is required"],
        select: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        select: true,
    },
    pictures: [{
        type: String,
        required: false,
        select: false,
    }],
    files: [{
        type: String,
        required: false,
        select: false,
    }],
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "distributors"
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agents"
    },
    deviceOrderNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "deviceOrders"
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes"
    }],
}, { _id: false });


// export schema
const deviceModel = mongoose.model("device", deviceSchema);
module.exports = deviceModel;