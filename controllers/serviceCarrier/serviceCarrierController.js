// dependencies
const ServiceCarrier = require("../../models/serviceModels/serviceCarrierModel");
const Encrypter = require("../../utilities/crpyto");
const AppError = require("../error/appError");

// module scafolding
const serviceCarrier = {};


// add service carrier data
serviceCarrier.add = async (req, res, next) => {

    // take service carrier data form the request body
    const serviceCarrier = typeof (req.body.serviceCarrier) === "object" ? req.body.serviceCarrier : false;


    // check if service carrier data is present or not
    if (serviceCarrier) {
        // save service carrier data to the database
        try {
            // find last inserted id 
            const lastId = await ServiceCarrier.findOne().sort('-id');
            if (lastId) {
                // add new id to sim card data
                let newId = parseInt(lastId.id) + 1;
                serviceCarrier.id = typeof (newId) === "number" ? newId : false;
            }

            // encrypt service carier crediantials
            const encrypter = new Encrypter(process.env.SECRET_KEY);


            serviceCarrier.apiUserName = await encrypter.encrypt(serviceCarrier.apiUserName);
            serviceCarrier.apiTokenPassword = await encrypter.encrypt(serviceCarrier.apiTokenPassword);
            serviceCarrier.clecid = await encrypter.encrypt(serviceCarrier.clecid);
            serviceCarrier.apiPin = await encrypter.encrypt(serviceCarrier.apiPin);


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
                next(error)
            }
        }
    } else {
        res.status(400).json({
            status: "bad request",
            message: "There is problem with input data",
        });
    }
};


// view service carrier data
serviceCarrier.view = async (req, res, next) => {

    // console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        // take service carrier id form the request query
        const serviceCarrierId = typeof (req.query.id) === "string" && req.query.id > 0 ? req.query.id : false;

        // find service carrier data by id
        try {
            const serviceCarrierData = await ServiceCarrier.findOne({ id: serviceCarrierId }).select("+files +apiUserName +apiTokenPassword +clecid +apiPin +notes");

            if (serviceCarrierData) {
                res.status(200).json({
                    status: "success",
                    data: serviceCarrierData,
                });
            } else {
                res.status(404).json({
                    status: "not found",
                    data: "Please provide valid service carrier id",
                });
            }
        } catch (err) {
            const error = AppError(500, "server error", "There is an internal server error, please try again letter");
            next(error);
        }
    } else {


        // find all service carrier data
        try {
            const serviceCarrierData = await ServiceCarrier.find();

            if (serviceCarrierData) {
                res.status(200).json({
                    status: "success",
                    data: serviceCarrierData,
                });
            } else {
                res.status(404).json({
                    status: "not found",
                    data: "Please provide valid service carrier id",
                });
            }
        } catch (err) {
            const error = AppError(500, "server error", "There is an internal server error, please try again letter");
            next(error);
        }
    }

}


// update service carrier data
serviceCarrier.update = async (req, res, next) => {
    // take service carrier id form the request query
    const serviceCarrierId = typeof (req.body.serviceCarrier.id) === "number" && req.body.serviceCarrier.id > 0 ? req.body.serviceCarrier.id : false;
    // console.log(typeof req.body.serviceCarrier.id);

    // take service carrier data from the request body and make id undefined
    const serviceCarrierData = typeof (req.body.serviceCarrier) === "object" ? req.body.serviceCarrier : false;

    // find service carrier data by id
    try {
        const serviceCarrierUpdatedData = await ServiceCarrier.findOneAndUpdate({ id: serviceCarrierId }, serviceCarrierData);

        if (serviceCarrierUpdatedData) {
            res.status(200).json({
                status: "success",
                data: serviceCarrierUpdatedData,
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid service carrier id",
            });
        }
    } catch (err) {
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
};


// remove service carrier data
serviceCarrier.remove = async (req, res, next) => {
    // take service carrier id form the request query
    const serviceCarrierId = req.query.id;

    // find service carrier data by id
    try {
        const serviceCarrierData = await ServiceCarrier.findOneAndDelete({ id: serviceCarrierId });

        if (serviceCarrierData) {
            res.status(200).json({
                status: "success",
                message: "Service carrier is deleted successfully"
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid service carrier id",
            });
        }
    } catch (err) {
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
}

// export module
module.exports = serviceCarrier;