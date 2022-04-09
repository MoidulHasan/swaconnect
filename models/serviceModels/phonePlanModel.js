// Dependencies
const mongoose = require("mongoose");


// schema scafolding
const phonePlanSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: [true, "phone plan id is required"],
        unique: true,
        select: true,
    },
    createdDate: {
        type: Date,
        required: [true, "plan creation date is required"],
        select: true,
    },
    name: {
        type: String,
        required: [true, "plan name is required"],
        select: true,
    },
    description: {
        type: String,
        required: [true, "plan description is required"],
        select: true,
    },
    serviceCarrier: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "service carrier id is required"],
        select: true,
    },
    planCode: {
        type: String,
        require: [true, "plan code is required"],
        select: true,
    }
});


// export model
const phonePlan = mongoose.model("phonePlan", phonePlanSchema);
module.exports = phonePlan;