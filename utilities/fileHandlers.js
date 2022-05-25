/**
 * Name: File Handler
 * Description: provide file related utilites
 */

// dependencies
const multer = require("multer");

// module scafolding
const file = {};

file.storage = multer.diskStorage()


// export module
module.exports = file;