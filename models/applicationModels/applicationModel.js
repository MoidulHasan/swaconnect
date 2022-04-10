// Dependencies
const mongoose = require("mongoose");


// Schema scafolding
const applicationSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: [true, "User id is required"],
        unique: true,
        select: true,
        default: 5000001,
    },
    applicantsFirstName: {
        type: String,
        required: [true, "Applicants first name is required"],
        selct: true,
    },
    applicantsLastName: {
        type: String,
        required: [true, "Applicants last name is required"],
        selct: true,
    },
    applicantsPhoneNumber: {
        type: String,
        required: [true, "Applicants phone number is required"],
        select: true,
    },
    applicantsEmail: {
        type: String,
        required: [true, "applicants email is required"],
        select: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    applicantsAddress: {
        type: String,
        required: [true, "applicants address is required"],
        select: true,
    }
});

// export model
const Application = mongoose.Model("Applications", applicationSchema);
module.exports = Application;