/**
 * Title: utils
 * Descriptions: Provide necessery utilities for common uses
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies


// module scafolding
const utils = {};

utils.isEmailValid = (email) => {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
};


utils.dateNow = () => {
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    // "27-11-2020"
    // console.log(dateString);
    return dateString;
};




// export module
module.exports = utils;