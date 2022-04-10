// dependencies
const ServiceCarrier = require("../../models/serviceModels/serviceCarrierModel")
const AppError = require("../error/appError");

// module scafolding
const serviceCarrier = {};


serviceCarrier.add = async(req, res, next) => {
    // take service carrier data form the request body
    const serviceCarrier = typeof(req.body.serviceCarrier) === "object" ? req.body.serviceCarrier : false;


    // check if service carrier data is present or not
    if (serviceCarrier) {
        // save service carrier data to the database
        try {
            // find last inserted id 
            const lastId = await ServiceCarrier.findOne().sort('-_id');
            if (lastId) {
                // add new id to sim card data
                let newId = parseInt(lastId._id) + 1;
                serviceCarrier._id = typeof(newId) === "number" ? newId : false;
            }

            const newServiceCarrier = await ServiceCarrier.create(serviceCarrier);


            // if new service carrier inserted then assign success response to output
            if (newServiceCarrier) {
                res.status(201).json({
                    status: "success",
                    message: "new service carrier is added",
                });
            }
        } catch (err) {
            // check if error is validation error
            if (err.name === "customError") {
                // send error response
                const statusCode = err.statusCode;
                err.statusCode = undefined;
                err.name = undefined;
                res.status(statusCode).json({
                    error: err
                });
            } else {
                // if ther is other error
                const error = new AppError(500, "Server Error", "There is an internal server error, please try again letter");

                // send error response
                next(err)
            }
        }
    } else {
        res.status(400).json({
            status: "bad request",
            message: "There is problem with input data",
        });
    }
};


// export module
module.exports = serviceCarrier;