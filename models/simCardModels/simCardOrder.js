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
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "notes"
    }],
});


// export schema
const simCardOrder = mongoose.model("simCardOrder", simCardOrderSchema);
module.exports = simCardOrder;