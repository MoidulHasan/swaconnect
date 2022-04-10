// dependencies
const ServiceCarrier = require("../../models/serviceModels/serviceCarrierModel")

// module scafolding
const serviceCarrier = {};


serviceCarrier.add = async(req, res, next) => {
    // take service carrier data form the request body
    const serviceCarrier = typeof(req.serviceCarrier) === "object" ? req.serviceCarrier : false;

    // check if service carrier data is present or not
    if (serviceCarrier) {

    } else {
        res.status(400).json({
            status: "bad request",
            message: "There is problem with input data",
        });
    }
};


// export module
module.exports = serviceCarrier;