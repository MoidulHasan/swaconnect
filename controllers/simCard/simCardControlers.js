// Dependencies
const date = require('date-and-time');
const now = new Date();
const SimCard = require('../../models/simCardModels/simCardModel')
const AppError = require('../../controllers/error/appError');
const logger = require('../../utilities/logger');
// const User = require('../../models/userModel')



// Module Scafolding
const simCardControlers = {};


simCardControlers.add = (req, res, next) => {
    // check the sim adding method
    const simAddingMethod = req.body.simAddingMethod;

    if (simAddingMethod === "manually") {


        // // validate sim card status
        // // const simStatus = validator(req.body.simCardData.simStatus) && (req.body.simCardData.simStatus === 'Blank' || req.body.simCardData.simStatus === 'Active' || req.body.simCardData.simStatus === 'Hotline') ? req.body.simCardData.simStatus : 'Blank';


        // // validate status date
        // // const statusDate = validator(req.body.simCardData.statusDate) ? req.body.simCardData.statusDate : date.format(now, 'YYYY/MM/DD');


        // // validate MDN
        // // const MDN = validator(req.body.simCardData.MDN) ? req.body.simCardData.MDN : false;


        // // validate user name
        // const userName = validator(req.body.simCardData.userName) ? req.body.simCardData.userName : false;


        // // validate vendorName
        // const vendorName = validator(req.body.simCardData.vendorName) ? req.body.simCardData.vendorName : false;


        // // validate sim order number
        // const orderNumber = validator(req.body.simCardData.orderNumber) ? req.body.simCardData.orderNumber : false;


        // // validate sim card compatibility
        // const compatibility = validator(req.body.simCardData.compatibility) ? req.body.simCardData.compatibility : false;


        // // // validate sim card Operations
        // // const operations = validator(req.body.simCardData.operations) ? req.body.simCardData.operations : false;


        // // validate sim card physical status
        // const physicalStatus = validator(req.body.simCardData.physicalStatus) && (req.body.simCardData.physicalStatus == 'Good' || req.body.simCardData.physicalStatus == 'Bad') ? req.body.simCardData.physicalStatus : false;


        // // validate sim card distributor name
        // const distributorName = validator(req.body.simCardData.distributorName) ? req.body.simCardData.distributorName : false;


        // // validate sim card agent name
        // const agentName = validator(req.body.simCardData.agentName) ? req.body.simCardData.agentName : false;


        // // validate sim card application number
        // const applicationNumber = validator(req.body.simCardData.applicationNumber) ? req.body.simCardData.applicationNumber : false;


        // // validate sim card custommer id
        // const customerId = validator(req.body.simCardData.customerId) > 0 ? req.body.simCardData.customerId : false;


        // // // validate customer first Name
        // // const customerFirstName = validator(req.body.simCardData.customerFirstName) > 0 ? req.body.simCardData.customerFirstName : false;

        // // // validate customer first Name
        // // const customerLastName = validator(req.body.simCardData.customerLastName) > 0 ? req.body.simCardData.customerLastName : false;


        // // validate phone plan
        // // const phonePlan = validator(req.body.simCardData.phonePlan) > 0 ? req.body.simCardData.phonePlan : false;

        // if (SSID && PUK1 && simStatus && statusDate && userName && vendorName && orderNumber && compatibility && physicalStatus && distributorName && agentName && applicationNumber && customerId) {
        //     // bind all data in sim card object
        //     const simCardData = {
        //         SSID: req.body.simCardData.SSID,
        //         PUK1: req.body.simCardData.PUK1,
        //         createdDate: date.format(now, 'YYYY/MM/DD HH:mm:ss'),
        //         simStatus: req.body.simCardData.simStatus,
        //         statusDate: req.body.simCardData.statusDate,
        //         MDN: req.body.simCardData.MDN,
        //         userName: req.body.simCardData.userName,
        //         vendorName: req.body.simCardData.vendorName,
        //         orderNumber,
        //         compatibility,
        //         physicalStatus,
        //         distributorName,
        //         agentName,
        //         applicationNumber,
        //         customerId
        //     }

        //     req.simCardData = simCardData;
        //     simCardControlers.addSingleSimCard(req, res, next);
        //     // console.log(simCardData);
        //     // res.status(200).json({
        //     //     status: "Success",
        //     //     data: simCardData
        //     // });
        // } else {
        //     res.status(400).json({
        //         status: "bad request",
        //         data: {
        //             message: "You have problem with your sim card data"
        //         }
        //     });
        // }

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
            simCardControlers.addSingleSimCard(simCardData, next);
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
simCardControlers.addSingleSimCard = async(simCardData, next) => {
    let result;
    try {
        // 1) check sim card already exist
        const simExistStatus = await SimCard.findOne({ SSID: simCardData.SSID });

        // 2) if sim card exist then assign error to output
        if (simExistStatus) {
            const error = new AppError(400, "bad request", "This Sim Card is already registered");
            output.error = error;
        } else {

            // 3) if sim card not exist then insert sim card data to database
            const newSimCart = await SimCard.create(simCardData);

            // if sim card inserted then assign success response to output
            if (newSimCart) {
                result.statusCode = 201;
                result.status = "Success";
                result.message = "new sim card added";
            }
        }
    } catch (err) {
        // check if error is validation error
        if (err.name === "ValidationError") {

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