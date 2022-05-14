// Dependencies
const mongoose = require("mongoose");


// Schema schafolding
const distributorSchema = mongoose.Schema({
    name: {
        type: String,
        select: true,
        required: [true, "Distributor name is required"]
    },
    role: {
        type: String,
        select: true,
        required: [true, "Distributor role is required"],
        default: 'Distributor',
    },
    contactPhone: {
        type: String,
        select: true,
        required: [true, "Contact number is required"],
    },
    contactEmail: {
        type: String,
        select: true,
        required: [true, "Distributor's Email is Required"],
    },
    agents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: null
    }],
});


// export model
const distributor = mongoose.model("Distributor", distributorSchema);
module.exports = distributor;