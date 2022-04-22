// dependencies
const mongoose = require("mongoose");
const customValidator = require("../../utilities/validator");


const subscriberSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Subscriber id is required"],
        unique: true,
        select: true,
        default: 100001,
    },
    subscriberCreatedDate: {
        type: Date,
        required: [true, "Subscriber Create date is required"],
        select: false,
        default: Date.now(),
    },
    subscriberCreatedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        required: [true, "Subscriber Creator Agent is required"],
        select: false,
    },
    subscrtiberApplicationNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: [true, "Subscriber Application Number is required"],
        select: false,
    },
    subscriberNationalVerifierApplicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NationalVerifierApplication",
        required: [true, "Subscriber National Verifier Id is required"],
        select: false,
    },
    subscriberUserName: {
        type: String,
        required: [true, "Subscriber User Name is required"],
        select: true,
        unique: true,
    },
    applicationFormType: {
        type: String,
        required: [true, "Application Form Type is Required"],
        select: false,
    },
    firstName: {
        type: String,
        required: [true, "Subscriber First Name is required"],
        select: true,
    },
    middleName: {
        type: String,
        select: true,
    },
    lastName: {
        type: String,
        required: [true, "Subscriber Last Name is required"],
        select: [true],
    },
    suffix: {
        type: String,
        select: true,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Subscriber Date of Birth is required"],
        select: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    SSN4: {
        type: String,
        select: true,
        unique: true,
    },
    tribalId: {
        type: String,
        select: true,
        unique: true,
    },
    alternateId: {
        type: Boolean,
        required: [true, "Alternate Id type is required"],
        select: true,
    },
    alternateIdType: {
        type: String,
        select: false,
    },
    alternateIdScrinshotsPage1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
        select: false,
    },
    alternateIdScrinshotsPage2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
        select: false,
    },
    phone: {
        type: String,
        required: [true, "Contact Phone Number is required"],
        select: true,
    },
    address: {
        type: String,
        required: [true, "Subscribe Address is required"],
        select: true,
    },
    city: {
        type: String,
        required: [true, "Subscriber City is required"],
        select: true,
    },
    state: {
        type: String,
        required: [true, "Subscriber State is Required"],
        select: true,
    },
    zipCode: {
        type: true,
        required: [true, "Subscriber Zip Code is Required"],
        select: true,
    },
    urbCode: {
        type: String,
        required: false,
    },
    temporaryAddress: {
        type: String,
        required: [true, "Temporary Address Status is Required"],
        select: true,
    },
    tribalLand: {
        type: String,
        required: [true, "Tribal Land Status Is Required"],
        select: false,
    },
    mailingAddress: {
        type: String,
        required: [true, "Mailing Address is required"],
        select: false,
    },
    mailingCity: {
        type: String,
        required: [true, "Mailing Address is required"],
        select: false,
    },
    mailingState: {
        type: String,
        required: [true, "Mailing State is requied"],
        select: false,
    },
    mailingZipCode: {
        type: String,
        required: [true, "Mailing Zip Code is Required"],
        select: false,
    },
    qualifingThoughDependent: {
        type: String,
        required: [true, "Qualifing Though Dependent Status is Required"],
        select: true,
    },
    bqpFirstName: {
        type: String,
        select: false,
    },
    bqpMiddleName: {
        type: String,
        select: false,
    },
    bqpLastName: {
        type: String,
        select: false,
    },
    bqpSuffix: {
        type: String,
        select: false,
    },
    bqpDateOfBirth: {
        type: Date,
        select: false,
    },
    bqpSSN: {
        type: Date,
        select: false,
    },
    bqpTribalId: {
        type: String,
        select: false,
    },
    bqpAlternateId: {
        type: String,
        select: false,
    },
    eligibilityProgramCode: [{
        type: String,
        required: true,
        select: false,
    }],
    consentInd: {
        type: Boolean,
        required: [true, "Consent Indicator is required"],
        select: false,
    },
    repAssignmentStatus: {
        type: Boolean,
        require: [true, "Representative Assignment Status Is Required"],
        select: false,
    },
    repId: {
        type: String,
        required: false,
        select: false,
    },
    subscriberSignature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
        required: false,
        select: false,
    },
    assignedSimCard: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SimCard",
        required: false,
        select: false,
    }],
    assignedDevice: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
        required: false,
        select: false,
    }],
    paymentCollected: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentCollected",
        required: false,
        select: false,
    }],
    nationalVerification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NationalVerification",
        required: false,
        select: false,
    },
    nlad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NLAD",
        required: false,
        select: false,
    },
    nladSetting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NLADSetting",
        required: false,
        select: false,
    },
});