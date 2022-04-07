// Dependencies
const date = require('date-and-time');
const now = new Date();
const SimCard = require('../../models/simCardModels/simCardModel')
    // const User = require('../../models/userModel')

// return true if paramete is string and length is more then 0 else false
const validator = (str) => {
    return typeof(str) === 'string' && str.length > 0 ? true : false;
};

// Module Scafolding
const simCardControlers = {};


simCardControlers.add = (req, res, next) => {
    // check the sim adding method
    const simAddingMethod = req.body.simAddingMethod;

    if (simAddingMethod === "manually") {

        // validate user inputed data
        // validate ssid
        const SSID = validator(req.body.simCardData.SSID) ? req.body.simCardData.SSID : false;

        // vaidate puk1
        const PUK1 = validator(req.body.simCardData.PUK1) ? req.body.simCardData.PUK1 : false;

        // assign createdate
        const createdDate = date.format(now, 'YYYY/MM/DD HH:mm:ss');

        // validate sim card status
        const simStatus = validator(req.body.simCardData.simStatus) && (req.body.simCardData.simStatus === 'Blank' || req.body.simCardData.simStatus === 'Active' || req.body.simCardData.simStatus === 'Hotline') ? req.body.simCardData.simStatus : 'Blank';


        // validate status date
        const statusDate = validator(req.body.simCardData.statusDate) ? req.body.simCardData.statusDate : date.format(now, 'YYYY/MM/DD');


        // validate MDN
        const MDN = validator(req.body.simCardData.MDN) ? req.body.simCardData.MDN : false;


        // validate user name
        const userName = validator(req.body.simCardData.userName) ? req.body.simCardData.userName : false;


        // validate vendorName
        const vendorName = validator(req.body.simCardData.vendorName) ? req.body.simCardData.vendorName : false;


        // validate sim order number
        const orderNumber = validator(req.body.simCardData.orderNumber) ? req.body.simCardData.orderNumber : false;


        // validate sim card compatibility
        const compatibility = validator(req.body.simCardData.compatibility) ? req.body.simCardData.compatibility : false;


        // // validate sim card Operations
        // const operations = validator(req.body.simCardData.operations) ? req.body.simCardData.operations : false;


        // validate sim card physical status
        const physicalStatus = validator(req.body.simCardData.physicalStatus) && (req.body.simCardData.physicalStatus == 'Good' || req.body.simCardData.physicalStatus == 'Bad') ? req.body.simCardData.physicalStatus : false;


        // validate sim card distributor name
        const distributorName = validator(req.body.simCardData.distributorName) ? req.body.simCardData.distributorName : false;


        // validate sim card agent name
        const agentName = validator(req.body.simCardData.agentName) ? req.body.simCardData.agentName : false;


        // validate sim card application number
        const applicationNumber = validator(req.body.simCardData.applicationNumber) ? req.body.simCardData.applicationNumber : false;


        // validate sim card custommer id
        const customerId = validator(req.body.simCardData.customerId) > 0 ? req.body.simCardData.customerId : false;


        // // validate customer first Name
        // const customerFirstName = validator(req.body.simCardData.customerFirstName) > 0 ? req.body.simCardData.customerFirstName : false;

        // // validate customer first Name
        // const customerLastName = validator(req.body.simCardData.customerLastName) > 0 ? req.body.simCardData.customerLastName : false;


        // validate phone plan
        // const phonePlan = validator(req.body.simCardData.phonePlan) > 0 ? req.body.simCardData.phonePlan : false;

        if (SSID && PUK1 && simStatus && statusDate && userName && vendorName && orderNumber && compatibility && physicalStatus && distributorName && agentName && applicationNumber && customerId) {
            // bind all data in sim card object
            const simCardData = {
                SSID,
                PUK1,
                createdDate,
                simStatus,
                statusDate,
                MDN,
                userName,
                vendorName,
                orderNumber,
                compatibility,
                physicalStatus,
                distributorName,
                agentName,
                applicationNumber,
                customerId
            }

            req.simCardData = simCardData;
            simCardControlers.addSingleSimCard(req, res, next);
            // console.log(simCardData);
            // res.status(200).json({
            //     status: "Success",
            //     data: simCardData
            // });
        } else {
            res.status(400).json({
                status: "bad request",
                data: {
                    message: "You have problem with your sim card data"
                }
            });
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
simCardControlers.addSingleSimCard = async(req, res, next) => {
    try {
        // 1) take sim card data form request
        const simCardData = req.simCardData;

        // 2) check sim card already exist
        const simExistStatus = await SimCard.findOne({ SSID: simCardData.SSID });
        if (simExistStatus) {
            res.status(400).json({
                status: "Bad Request",
                message: "This Sim Card is already registered"
            });
        } else {
            const newSimCart = await SimCard.create(simCardData);
            // console.log(newSimcart);
            if (newSimcart) {
                res.status(201).json({
                    status: "new sim card added",
                    data: {
                        newSimCart,
                    },
                });
            }
        }

    } catch (err) {
        // logger.error(err);

        if (err.name === "ValidationError") {
            let errors = {};

            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });

            return res.status(400).send({
                status: "bad request",
                message: "sim card data validation error",
                errorMessage: errors
            });
        }

        const error = new AppError(500, "Server Error", "There is an internal server error, please try again letter");
        next(error);
    }

};
// Export Module
module.exports = simCardControlers;