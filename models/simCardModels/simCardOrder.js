// Dependencies
const mongoose = require('mongoose');


// schema schafolding
const simCardOrderSchema = mongoose.Schema({
    simOrderNumber: {
        type: Number,
        required: [true, "Sim card order number required"],
        unique: true,
        select: true,
    },
    orderDate: {
        type: Date,
        required: [true, "Sim card order date required"],
        default: Date.now(),
        unique: false,
        select: true,
    },
    quantity: {
        type: Number,
        required: [true, "Sim card order quantity required"],
        unique: false,
        select: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
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
         * !need to know more about it
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
        ref: "SimCardBatch",
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes"
    }],
});


// export schema
const simCardOrder = mongoose.model("SimCardOrder", simCardOrderSchema);
module.exports = simCardOrder;