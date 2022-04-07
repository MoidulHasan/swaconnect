// depanedencies


// module scafolding
const customValidator = {};

// return true if paramete is string and length is more then 0 else false
customValidator.isNonZeroLengthString = (str) => {
    return typeof(str) === 'string' && str.length > 0 ? true : false;
};

// export module
module.exports = customValidator;