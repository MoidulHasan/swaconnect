// Dependencies
const mongoose = require("mongoose");


// Schema Schafolding
const noteSchema = mongoose.Schema({
    note: {
        type: String,
        required: [true, "Note is required"],
        unique: false,
        select: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
        select: true,
    },
    createdDate: {
        type: Date,
        required: [true, "Note created date is required"],
        default: Date.now,
        select: true,
    },
    category: {
        type: String,
        required: [true, "note category is required"],
        select: true,
    },
    // categoryId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     select: true,
    // }
});


// export model
const noteModel = mongoose.model("Note", noteSchema);
module.exports = noteModel;