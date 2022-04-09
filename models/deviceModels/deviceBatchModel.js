// Dependencies
const mongoose = reqire("mongoose");


// schema schafolding
const deviceBatchSchema = mongoose.Schema({
    batchNumber: {
        type: String,
        required: [true, "Device batch number is required"],
        unique: true,
        select: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        unique: false,
        select: true,
        required: true,
    },
    userName: {
        type: String,
        unique: false,
        select: true,
        required: false,
    },
    distributor: {
        type: true,
        unique: false,
        select: true,
        required: false,
    },
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
    }]
});


// export model
const deviceBatch = mongoose.model("DeviceBatch", deviceBatchSchema);
module.exports = deviceBatch;