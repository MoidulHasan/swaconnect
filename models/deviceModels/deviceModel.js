// dependencies
const mongoose = require("mongoose");


// schema schafolding
const deviceSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "device id is required"],
        unique: true,
        select: true,
        default: 500001,
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
        // required: [true, "fcc approval date is required"],
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
        ref: "Vendor",
        select: true,
    },
    pictures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
        select: false,
    }],
    files: [{
        type: String,
        required: false,
        select: false,
    }],
    distributor: {
        /**
         * !is it possible to have multiple distributor
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distributor",
        select: true,
    },
    agent: {
        /**
         * !is it possible to have multiple agent
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        select: true,
    },
    deviceOrderNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeviceOrder",
        select: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }],
}, { _id: false });


// export schema
const deviceModel = mongoose.model("Device", deviceSchema);
module.exports = deviceModel;