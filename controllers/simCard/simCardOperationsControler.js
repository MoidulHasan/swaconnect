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
        // get coverage for 321 communication
        if (serviceCarrierId === 101) {

            // get coverage data
            const coverageData = await communication321.getCoverage2(zipCode);
            // console.log("coverage data: ", coverageData);

            if (coverageData.data) {
                res.status(200).json({
                    status: "success",
                    IsActivationEligible: coverageData.data.IsActivationEligible,
                });
            }
            else if (coverageData) {
                res.status(500).json(coverageData);
            }
            else {
                res.status(200).json({
                    status: "server error",
                    message: "There is an internal server error",
                });
            }
        } else {
            const err = new AppError(400, "bad request", "please provide valied service carrier id");
            next(err);
        }
    } else {
        const err = new AppError(400, "bad request", "please provide valied zipcode and ssid");
        next(err);
    }
};


simCardOperations.ActivateSubscriber = async (req, res, next) => {
    // validate input data for activating a sim card
    const zipCode = typeof req.body.zipCode === "string" && req.body.zipCode.length > 0 ? req.body.zipCode : false;
    const ssid = typeof req.body.ssid === "string" && req.body.zipCode.length > 0 ? req.body.ssid : false;
    const planCode = typeof req.body.planCode === "number" ? req.body.planCode : false;
    const serviceCarrierId = typeof req.body.serviceCarrierId === "number" ? req.body.serviceCarrierId : false;


    // check if all required data is available
    if (zipCode && ssid && planCode && serviceCarrierId) {
        const simData = {
            zipCode,
            ssid,
            planCode
        }

        // select service carrier data
        if (serviceCarrierId == 101) {

        }
        else {
            const err = new AppError(400, "bad request", "please provide valied service carrier id");
            next(err);
        }

    }
    else {
        const err = new AppError(400, "bad request", "please provide valied zipcode, ssid, Plan Code and Service carrier id");
        next(err);
    }

}


// export module
module.exports = simCardOperations;