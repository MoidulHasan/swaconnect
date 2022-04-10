const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        select: true,
        unique: false,
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        select: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please fill your password"],
        minLength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
    },
    active: {
        type: Boolean,
        default: true,
        select: true,
    },
    loginStatus: {
        type: Boolean,
        default: false,
        select: true,
    },
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre("save", async function(next) {
    // check the password if it is modified
    if (!this.isModified("password")) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function(
    typedPassword,
    originalPassword,
) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;