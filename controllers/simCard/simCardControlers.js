// Dependencies
const date = require('date-and-time');
const now = new Date();
const SimCard = require('../../models/simCardModels/simCardModel')
const AppError = require('../../controllers/error/appError');
const logger = require('../../utilities/logger');
// const User = require('../../models/userModel')



// Module Scafolding
const simCardControlers = {};


simCardControlers.add = async(req, res, next) => {
    // check the sim adding method
    const simAddingMethod = req.body.simAddingMethod;

    if (simAddingMethod === "manually") {

        // take sim card data form the requiest body
        const simCardData = typeof(req.body.simCardData) === 'object' ? req.body.simCardData : false;

        // check if sim card data is not present
        if (!simCardData) {
            res.status(400).json({
                status: "bad request",
                data: {
                    message: "You have problem with your sim card data"
                }
            });
        } else {
            // get sim card input response
            const simCardInsert = await simCardControlers.addSingleSimCard(simCardData);

            console.log(simCardInsert);


            // check if have error
            if (simCardInsert.error) {
                next(simCardInsert.error);
            } else {
                res.status(simCardInsert.statusCode).json({
                    status: simCardInsert.status,
                    data: {
                        message: simCardInsert.message
                    }
                });
            }

        }
    } else if (simAddingMethod === "auto") {

    } else {
        res.status(400).json({
            status: "bad request",
            data: {
                message: "Please provide proper sim card adding method"
            }
        });
    }
};

// Add single sim card
simCardControlers.addSingleSimCard = async(simCardData) => {
    let result = {};
    try {
        // 1) check sim card already exist
        const simExistStatus = await SimCard.findOne({ SSID: simCardData.SSID });

        // 2) if sim card exist then assign error to output
        if (simExistStatus) {
            const error = new AppError(400, "bad request", "This Sim Card is already registered");
            result.error = error;
        } else {

            // 3) find last inserted sim card id
            const lastId = await SimCard.findOne().sort('-_id');

            // 4) add id to sim card data
            simCardData._id = lastId._id + 1;

            console.log("new id: ", simCardData._id)

            // 5) if sim card not exist then insert sim card data to database
            const newSimCart = await SimCard.create(simCardData);

            // 6) if sim card inserted then assign success response to output
            if (newSimCart) {
                result.statusCode = 201;
                result.status = "Success";
                result.message = "new sim card added";
            }
        }
    } catch (err) {
        console.log("error catched", err);
        // check if error is validation error
        if (err.name === "ValidationError") {

            // console.log("Validation error occured")
            // take all error to errors object
            let errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });

            // construct error and assign to output
            const error = new AppError(500, "bad request", "sim card data validation error");
            error.allErrors = errors;
            result.error = error;
        } else {
            // if error is not validation error then save it to log file and create and assign an server error to output
            logger.error(err);
            const error = new AppError(500, "Server Error", "There is an internal server error, please try again letter");
            result.error = error;
        }
    }
    return result;
};
// Export Module
module.exports = simCardControlers;