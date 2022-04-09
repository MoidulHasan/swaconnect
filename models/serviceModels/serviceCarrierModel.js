// Dependencies
const mongoose = require("mongooose");
const validator = require("validator");

// schema schafolding
const serviceCarrierSchema = mongoose.Schema({
    label: {
        type: String,
        required: [true, "service carrier label is required"],
        select: true,
    },
    name: {
        type: String,
        required: [true, "service carrear name is required"],
        select: true,
        unique: true,
    },
    createdDate: {
        type: Date,
        required: [true, "service carrear creation date is required"],
        select: true,
    },
    contactName: {
        type: String,
        required: [true, "service carrear contact name is required"],
        select: true,
    },
    contactPhone: {
        type: String,
        required: [true, "service carrear contact phone is required"],
        select: true,
    },
    contactEmail: {
        type: String,
        required: [true, "service carrear contact email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, " Please provide a valid service carrear contact email"],
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
});


// export model
const serviceCarrier = mongoose.model("serviceCarrier", serviceCarrierSchema);