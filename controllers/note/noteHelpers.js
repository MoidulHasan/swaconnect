// dependencies
const mongoose = require("mongoose");



// module scafoldings
const note = {};

note.create = async (noteData) => {
    const output = {};

    // validate the input
    const note = typeof noteData.note === "string" && noteData.note.length > 0 ? noteData.note : false;
    const userId = mongoose.Types.ObjectId.isValid(noteData.userId) ? noteData.userId : false;
    const category = typeof noteData.category === "string" && noteData.categorylength > 0 ? noteData.note : false;


}

// export module
module.exports = note;