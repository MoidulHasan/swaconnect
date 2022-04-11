// Dependencies
const mongoose = require("mongoose");
const validator = require("validator");

// Schema Scafolding
const vendorSchema = new mongoose.schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        select: true,
        default: 80001
    },
    company: {
        type: String,
        required: true,
        select: true,
        unique: false,
    },
    firstName: {
        type: String,
        required: [true, "vendors first name required"],
        select: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: [true, "vendors last name required"],
        select: true,
        unique: false,
    },
    phone: {
        type: String,
        required: [true, "vendors phone required"],
        select: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please fill your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    address1: {
        type: String,
        required: [true, "address1 required"],
        select: true,
        unique: false,
    },
    address2: {
        type: String,
        select: true,
        unique: false,
    },
    city: {
        type: String,
        required: [true, "city name required"],
        select: true,
        unique: false,
    },
    state: {
        type: String,
        required: [true, "state name required"],
        select: true,
        unique: false,
    },
    zipCode: {
        type: String,
        required: [true, "zip code is required"],
        select: true,
        unique: false,
    },
    notes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: false,
    }
});


// export model
const Vendor = mongoose.Model("Vendor", vendorSchema);
module.exports = Vendor;