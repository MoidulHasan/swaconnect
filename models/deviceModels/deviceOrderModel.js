// Dependencies
const mongoose = require('mongoose');


// schema schafolding
const deviceOrderSchema = mongoose.Schema({
    orderNumber: {
        type: Number,
        required: [true, "Device order number required"],
        unique: true,
        select: true,
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
        type: String,
        required: false,
        select: true,
    }],
    trackingNumber: {
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
        type: String,
        select: true,
    },
    deviceModel: {
        type: String,
        reqired: [true, "deveice model name is required"],
        select: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes"
    }],
});


// export schema
const deviceOrder = mongoose.model("deviceOrder", deviceOrderSchema);
module.exports = deviceOrder;