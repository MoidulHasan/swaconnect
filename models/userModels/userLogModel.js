// Dependencies
const mongoose = require("mongoose");

// schema scafolding
const userLogSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "operations user name is required"],
        select: true,
    },
    date: {
        type: Date,
        required: [true, "operations date is required"],
        select: true,
        default: Date.now,
    },
    operation: {
        type: String,
        required: [true, "Operation name is required"],
        select: true,
    },
    result: {
        type: String,
        required: [true, "Operation's result is required"],
        select: true,
    }
});


// export module
const userLogModel = mongoose.Model("UserLog", userLogSchema);
module.exports = userLogModel;