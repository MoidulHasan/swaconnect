// Dependencies
const mongoose = require("mongoose");


// Schema schafolding
const simOperationLogSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    operation: {
        type: String,
        required: [true, "sim card operation name is required"],
        select: true,
        unique: false,
    },
    result: {
        type: String,
        required: [true, "operation result is required"],
        select: true,
        unique: false,
    },
    ssid: {
        type: String,
        required: [true, "Operation sim card is required"],
    },
}, { _id: false });


// export model
const simOperationLog = mongoose.model("SimOperationLog", simOperationLogSchema);
module.exports = simOperationLog;