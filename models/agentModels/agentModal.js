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
        required: [true, "Agent role is required"],
        default: 'Agent',
    },
    contactPhone: {
        type: String,
        select: true,
        required: [true, "Contact number is required"],
    },
    contactEmail: {
        type: String,
        select: true,
        required: [true, "Agent's Email is Required"],
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distributor",
        default: null
    },
});


// export model
const agent = mongoose.model("Agent", agentSchema);
module.exports = agent;