// dependencies
const communication321 = require('../serviceCarrier/321CommunicationsControler');
const AppError = require("../error/appError");

// module schafolfing
const simCardOperations = {};


// get coverage2 controler
simCardOperations.GetCoverage2 = async (req, res, next) => {

    // validate input data
    const zipCode = typeof req.body.zipCode === "string" && req.body.zipCode.length > 0 ? req.body.zipCode : false;
    const serviceCarrierId = typeof req.body.serviceCarrierId === "number" ? req.body.serviceCarrierId : false;

    // check if ssid and zip code is valied
    if (serviceCarrierId && zipCode) {
        if (serviceCarrierId === 101) {

            const serviceCarrier = communication321;

            // get coverage data
            const coverageData = await serviceCarrier.getCoverage2(zipCode);
            console.log(coverageData);

        }
    } else {
        const err = new AppError(400, "bad request", "please provide valied zipcode and ssid");
    }
};



// export module
module.exports = simCardOperations;