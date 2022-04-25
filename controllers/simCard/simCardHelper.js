// dependencies
const { dateNow } = require("../../utilities/utils");
const SimCardModal = require("../../models/simCardModels/simCardModel");
const AppError = require("../../controllers/error/appError");
const logger = require("../../utilities/logger");
const ObjectId = require('mongodb').ObjectId;


// module scafolding
const helpers = {};


// add a single sim card
helpers.addSimCard = async (simData) => {
    const output = {};
    // validate sim card data
    const SSID =
        typeof simData.SSID === "string" && simData.SSID.length > 0
            ? simData.SSID
            : false;
    const PUK1 =
        typeof simData.PUK1 === "string" && simData.PUK1.length > 0
            ? simData.PUK1
            : false;
    const userName =
        typeof simData.userName === "string" && simData.userName.length > 0
            ? simData.userName
            : false;
    const serviceCarrier =
        typeof simData.serviceCarrier === "string" && simData.serviceCarrier.length > 0
            ? ObjectId(simData.serviceCarrier)
            : false;
    const vendorId =
        typeof simData.vendorId === "string" && simData.vendorId.length > 0
            ? ObjectId(simData.vendorId)
            : false;
    const compatibility =
        typeof simData.compatibility === "string" &&
            simData.compatibility.length > 0
            ? simData.compatibility
            : false;
    const physicalStatus =
        typeof simData.physicalStatus === "string" &&
            simData.physicalStatus.length > 0
            ? simData.physicalStatus
            : false;
    const orderNumber =
        typeof simData.orderNumber === "string" &&
            simData.orderNumber.length > 0
            ? ObjectId(simData.orderNumber)
            : false;

    // check validition status of all required field
    if (SSID && PUK1 && userName && serviceCarrier && compatibility && physicalStatus) {
        // construct simcard object
        const simCard = {
            SSID,
            PUK1,
            userName,
            serviceCarrier,
            compatibility,
            physicalStatus,
            vendorId,
            orderNumber
        }
        console.log(simCard);

        // insert sim card data to database
        try {
            // 1) check sim card already exist
            const simExistStatus = await SimCardModal.findOne({ SSID: simCard.SSID });

            // 2) if sim card exist then assign error to output
            if (simExistStatus) {
                const error = new AppError(
                    400,
                    "bad request",
                    "This SSID is already registered"
                );
                output.error = error;
            } else {
                // 3) find last inserted sim card id
                const lastId = await SimCardModal.findOne().sort("-id");
                if (lastId) {
                    // 4) add new id to sim card data
                    let newId = parseInt(lastId.id) + 1;
                    simCard.id = typeof newId === "number" ? newId : false;
                }

                // 5) if sim card not exist then insert sim card data to database
                const newSimCart = await SimCardModal.create(simCard);

                // 6) if sim card inserted then assign success response to output
                if (newSimCart) {
                    output.status = "success";
                    output.message = "new sim card added";
                }
                else {
                    output.status = "fail";
                    output.message = "sim card not inserted";
                }
            }
        } catch (error) {
            console.log(error);
            // check if error is validation error
            if (error.name === "ValidationError") {
                // console.log("Validation error occured")
                // take all error to errors object
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                    errors[key] = error.errors[key].message;
                });

                // construct error and assign to output
                const error = new AppError(
                    500,
                    "bad request",
                    "sim card data validation error"
                );
                error.allErrors = errors;
                output.error = error;
            } else {
                // if error is not validation error then save it to log file and create and assign an server error to output
                // logger.error(error);
                const error = new AppError(
                    500,
                    "Server Error",
                    "There is an internal server error, please try again letter"
                );
                output.error = error;
            }
        }
    }
    else {
        output = {
            status: "fail",
            message: "Please provide all required value"
        }
    }

    // return output
    return output;
};


// update sim card data
helpers.updateSimCard = async (simData) => {
    const updateData = {};

    // include ssid to be updated if valid
    // if(typeof simData.ssid === "string" && simData.ssid.length >0) 
    //  updateData.ssid = simData.ssid;

    // include ESN if valid
    if (typeof simData.ESN === "string" && simData.ESN.length > 0)
        updateData.ESN = simData.ESN;


    // include serviceCarrier if valid
    if (typeof simData.serviceCarrier === "string" && simData.serviceCarrier.length > 0)
        updateData.serviceCarrier = ObjectId(simData.serviceCarrier);


    // include PUK1 if valid
    if (typeof simData.PUK1 === "string" && simData.PUK1.length > 0)
        updateData.PUK1 = simData.PUK1;


    // include simStatus and status date if valid
    if (typeof simData.simStatus === "string" && simData.simStatus.length > 0) {
        updateData.simStatus = simData.simStatus;
        updateData.statusDate = Date.now("dd/mm/yyyy");
    }


    // include MDN if valid
    if (typeof simData.MDN === "string" && simData.MDN.length > 0)
        updateData.MDN = simData.MDN;



    // include userName if valid
    if (typeof simData.userName === "string" && simData.userName.length > 0)
        updateData.userName = simData.userName;


    // include vendor if valid
    if (typeof simData.vendor === "string" && simData.vendor.length > 0)
        updateData.vendor = ObjectId(simData.vendor);


    // include orderNumber if valid
    if (typeof simData.orderNumber === "string" && simData.orderNumber.length > 0)
        updateData.orderNumber = ObjectId(simData.orderNumber);


    // include compatibility if valid
    if (typeof simData.compatibility === "string" && simData.compatibility.length > 0)
        updateData.compatibility = simData.compatibility;



    // include SimOperations if valid
    if (typeof simData.SimOperations === "string" && simData.SimOperations.length > 0)
        updateData.SimOperations = ObjectId(simData.SimOperations);



    // include physicalStatus if valid
    if (typeof simData.physicalStatus === "string" && simData.physicalStatus.length > 0)
        updateData.physicalStatus = simData.physicalStatus;


    // include distributor if valid
    if (typeof simData.distributor === "string" && simData.distributor.length > 0)
        updateData.distributor = ObjectId(simData.distributor);


    // include agent if valid
    if (typeof simData.agent === "string" && simData.agent.length > 0)
        updateData.agent = ObjectId(simData.agent);


    // include customerId if valid
    if (typeof simData.customerId === "string" && simData.customerId.length > 0)
        updateData.customerId = ObjectId(simData.customerId);


    // include phonePlan if valid
    if (typeof simData.phonePlan === "string" && simData.phonePlan.length > 0)
        updateData.phonePlan = ObjectId(simData.phonePlan);


    // include returns if valid
    if (typeof simData.returns === "string" && simData.returns.length > 0)
        updateData.returns = ObjectId(simData.returns);


    // include simOperationsLog if valid
    if (typeof simData.simOperationsLog === "string" && simData.simOperationsLog.length > 0)
        updateData.simOperationsLog = ObjectId(simData.simOperationsLog);



    // include simOperationsLog if valid
    if (typeof simData.notes === "string" && simData.notes.length > 0)
        updateData.notes = ObjectId(simData.notes);

    console.log(updateData);


};




// export module
module.exports = helpers;
