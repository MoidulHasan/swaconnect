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
        select: false,
    }],
    apiUserName: {
        type: String,
        required: [true, "API user name is required"],
        select: false,
    },
    apiTokenPassword: {
        type: String,
        required: [true, "API password is required"]
    },
    CLECID: {
        type: String,
        required: [true, "CLIECID is required"],
        select: false,
    },
    apiPin: {
        type: String,
        required: [true, "API pin is required"],
        select: false,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        select: true,
    }],
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        select: true,
    },
    supportName: {
        type: String,
        required: [true, "Service carreir support name is required"],
        select: false,
        unique: false,
    },
    supportPhone: {
        type: String,
        required: [true, "Service carreir support phone is required"],
        select: false,
    },
    supportEmail: {
        type: String,
        required: [true, "Service carreir support email is required"],
        select: false,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phonePlans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PhonePlan"
    }]
});


// export model
const serviceCarrier = mongoose.model("serviceCarrier", serviceCarrierSchema);