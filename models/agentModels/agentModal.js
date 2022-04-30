// Dependencies
const mongoose = require("mongoose");


// Schema schafolding
const agentSchema = mongoose.Schema({

    name: {
        type: String,
        select: true,
        required: [true, "agent name is required"]
    },
    role: {
        type: String,
        select: true,
        required: [true, "agent role is required"]
    },
    role: {
        type: Date,
        required: true,
        default: Date.now,
    },
    operation: {
        type: String,
        required: [true, "sim card operation name is required"],
        select: true,
        unique: false,
    },
    status: {
        type: String,
        required: [true, "operation status is required"],
        select: true,
        unique: false,
    },
    simCardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimCard",
        required: [true, "sim card id is required"],
        select: true,
    },
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
        select: true,
    }
});


// export model
const simOperationLog = mongoose.model("SimOperationLog", simOperationLogSchema);
module.exports = simOperationLog;