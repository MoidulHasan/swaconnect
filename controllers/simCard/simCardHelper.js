// dependencies
const { dateNow } = require("../../utilities/utils");
const SimCardModal = require("../../models/simCardModels/simCardModel");
const AppError = require("../../controllers/error/appError");
const logger = require("../../utilities/logger");
const ObjectId = require('mongodb').ObjectId;
const SimOperation = require("../../models/simCardModels/simOperationModel");

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
    const userId =
        typeof simData.userId === "string" && simData.userId.length > 0
            ? ObjectId(simData.userId)
            : false;
    const serviceCarrier =
        typeof simData.serviceCarrier === "string" && simData.serviceCarrier.length > 0
            ? ObjectId(simData.serviceCarrier)
            : false;
    const vendor =
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
    if (SSID && PUK1 && userId && serviceCarrier && vendor && compatibility && physicalStatus && orderNumber) {
        // construct simcard object
        const simCard = {
            SSID,
            PUK1,
            userId,
            serviceCarrier,
            vendor,
            compatibility,
            physicalStatus,
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
                    const operation = {
                        operation: "Sim Card Insert",
                        simCardId: newSimCart._id,
                        operator: simCard.userId,
                        status: "success"
                    }

                    // save operation log to database
                    const operationLog = await SimOperation.create(operation);

                    // insert operation log id to sim card
                    /**
                     * !todo: have to update sim card with operation log
                     */



                }
                else {
                    const err = new AppError(500, "server error", "There is an internal server error, please try again.")
                    output.status = "fail";
                    output.error = err;
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
                output.status = "fail";
                output.error = error;
            } else {
                // if error is not validation error then save it to log file and create and assign an server error to output
                // logger.error(error);
                const error = new AppError(
                    500,
                    "Server Error",
                    "There is an internal server error, please try again letter"
                );
                output.status = "fail";
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
    const output = {};

    if (simData) {

        // validate ssid
        const _id = typeof simData._id === "string" && simData._id.length > 0 ?
            ObjectId(simData._id) : false;

        if (_id) {
            // find the ssid in database
            const simCardPrevData = await SimCardModal.findOne({ _id: _id });

            console.log(simCardPrevData);
            // if found the sim card data in database
            if (simCardPrevData._id === _id) {

                const updateData = {};

                // validate ssid
                const ssid = typeof simData.ssid === "string" && simData.ssid.length > 0 ?
                    simData.ssid : false;

                // include ESN if valid
                if (typeof simData.ESN === "string" && simData.ESN.length > 0)
                    simCardPrevData.ESN = simData.ESN;

                // include serviceCarrier if valid
                if (typeof simData.serviceCarrier === "string" && simData.serviceCarrier.length > 0)
                    simCardPrevData.serviceCarrier = ObjectId(simData.serviceCarrier);

                // include PUK1 if valid
                if (typeof simData.PUK1 === "string" && simData.PUK1.length > 0)
                    simCardPrevData.PUK1 = simData.PUK1;

                // include simStatus and status date if valid
                if (typeof simData.simStatus === "string" && simData.simStatus.length > 0) {
                    simCardPrevData.simStatus = simData.simStatus;
                    simCardPrevData.statusDate = Date.now("dd/mm/yyyy");
                }

                // include MDN if valid
                if (typeof simData.MDN === "string" && simData.MDN.length > 0)
                    simCardPrevData.MDN = simData.MDN;

                // include userName if valid
                if (typeof simData.userName === "string" && simData.userName.length > 0)
                    simCardPrevData.userName = simData.userName;

                // include vendor if valid
                if (typeof simData.vendor === "string" && simData.vendor.length > 0)
                    simCardPrevData.vendor = ObjectId(simData.vendor);

                // include orderNumber if valid
                if (typeof simData.orderNumber === "string" && simData.orderNumber.length > 0)
                    simCardPrevData.orderNumber = ObjectId(simData.orderNumber);

                // include compatibility if valid
                if (typeof simData.compatibility === "string" && simData.compatibility.length > 0)
                    simCardPrevData.compatibility = simData.compatibility;

                // include SimOperations if valid
                if (typeof simData.SimOperations === "string" && simData.SimOperations.length > 0) {
                    simCardPrevData.SimOperations.push(ObjectId(simData.SimOperations));
                }


                // include physicalStatus if valid
                if (typeof simData.physicalStatus === "string" && simData.physicalStatus.length > 0)
                    simCardPrevData.physicalStatus = simData.physicalStatus;

                // include distributor if valid
                if (typeof simData.distributor === "string" && simData.distributor.length > 0)
                    simCardPrevData.distributor = ObjectId(simData.distributor);

                // include agent if valid
                if (typeof simData.agent === "string" && simData.agent.length > 0)
                    simCardPrevData.agent = ObjectId(simData.agent);

                // include customerId if valid
                if (typeof simData.customerId === "string" && simData.customerId.length > 0)
                    simCardPrevData.customerId = ObjectId(simData.customerId);

                // include phonePlan if valid
                if (typeof simData.phonePlan === "string" && simData.phonePlan.length > 0)
                    simCardPrevData.phonePlan = ObjectId(simData.phonePlan);

                // include returns if valid
                if (typeof simData.returns === "string" && simData.returns.length > 0)
                    simCardPrevData.returns = ObjectId(simData.returns);

                // include simOperationsLog if valid
                if (typeof simData.simOperationsLog === "string" && simData.simOperationsLog.length > 0)
                    simCardPrevData.simOperationsLog.push(ObjectId(simData.simOperationsLog));

                // include simOperationsLog if valid
                if (typeof simData.notes === "string" && simData.notes.length > 0)
                    simCardPrevData.note.push(ObjectId(simData.notes));

                console.log(simCardPrevData);


                // const updateSim = await SimCardModal.findOneAndUpdate


            } else {
                output.status = "fail";
                output.error = new AppError(400, "bad request", "please provide valid object id");
            }
        }
        else {
            output.status = "fail";
            output.error = new AppError(400, "bad request", "please provide valid object id");
        }



    } else {
        output.status = "fail";
        output.error = new AppError(400, "bad request", "please provide valid data");
    }

    return output;



};



// view single sim card data
helpers.viewSimData = async (_id) => {
    const output = {};
    // find sim card data by sim card id
    try {
        let simData;
        if (_id) {
            simData = await SimCardModal.findOne({ _id: _id })
                // .select('userName orderNumber operations distributor agent applicationNumber customerId phonePlan returns simOperationsLog notes')
                .populate("serviceCarrier")
                .populate("vendor")
                // .populate("orderNumber")
                .populate("operations")
                .populate("agent")
                .populate("applicationNumber")
                .populate("customerId")
                .populate("phonePlan")
            // .populate("simOperationsLog")
            // .populate("notes");
        } else {
            simData = await SimCardModal.find()
                // .select('userName orderNumber operations distributor agent applicationNumber customerId phonePlan returns simOperationsLog notes')
                .populate("serviceCarrier")
                .populate("vendor")
                // .populate("orderNumber")
                .populate("operations")
                .populate("agent")
                .populate("applicationNumber")
                .populate("customerId")
                .populate("phonePlan")
            // .populate("simOperationsLog")
            // .populate("notes");
        }

        console.log(simData);

        if (simData) {
            output.status = "success";
            output.data = simData;
        } else {
            output.status = "fail";
            output.data = null;
            output.message = "no sim card found";
        }
    } catch (err) {
        console.log(err);
        output.status = "fail";
        output.message = "server error";
    }

    return output;
};


// sim card operation log
helpers.insertOperation = async (operation) => {
    let output;
    if (operation) {
        // insert operation log to database
        const operation = await SimOperation.create(operation);



        if (operation && operation._id) {
            output.status = "success";
            output.data = operation;
        }
        else {
            output.status = "fail"
            output.erorr = operation.error;
        }
    } else {
        output.status = "fail";
        output.error = "invalid input";
    }
    return operation;
}




// export module
module.exports = helpers;
