// Dependencies
const mongoose = require('mongoose');


// schema schafolding
const deviceOrderSchema = mongoose.Schema({
    orderNumber: {
        type: String,
        required: [true, "Device order number required"],
        unique: true,
        select: true,
        default: "700001"
    },
    orderDate: {
        type: Date,
        required: [true, "Device order date required"],
        unique: false,
        select: true,
    },
    quantity: {
        type: Number,
        required: [true, "Device order quantity required"],
        unique: false,
        select: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vendors",
        select: true,
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
        select: true,
    }],
    trackingNumber: {
        /**
         * !Have some confusion here
         */
        type: Number,
        required: [true, "Tracking number is required"],
        unique: true,
        select: true,
    },
    receivedDate: {
        type: Date,
        required: [true, "Sim card order receive date is required"],
        select: true,
    },
    batchNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeviceBatch",
        select: true,
    },
    deviceModel: {
        type: String,
        reqired: [true, "deveice model name is required"],
        select: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }],
});


// export schema
const deviceOrder = mongoose.model("DeviceOrder", deviceOrderSchema);
module.exports = deviceOrder;