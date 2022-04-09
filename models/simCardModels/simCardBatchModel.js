// Dependencies
const mongoose = reqire("mongoose");


// schema schafolding
const simCardBatchSchema = mongoose.Schema({
    batchNumber: {
        type: String,
        required: [true, "Sim card batch number is required"],
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
    }
});


// export model
const simCardBatch = mongoose.model("SimCardBatch", simCardBatchSchema);
module.exports = simCardBatch;