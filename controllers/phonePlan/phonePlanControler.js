// dependencies
const mongoose = require("mongoose");
const PhonePlan = require("../../models/serviceModels/phonePlanModel")
const AppError = require("../error/appError");
const { addPlan, planViewByID, planViewByServiceCarrierID } = require("./phonePlanHelpers");

// module scafolding
const phonePlan = {};


// phone plan adding method
phonePlan.add = async (req, res, next) => {

    // take phone plan data form the request body
    let phonePlan = typeof (req.body.phonePlan) === "object" ? req.body.phonePlan : false;


    phonePlan.serviceCarrier = mongoose.Types.ObjectId.isValid(phonePlan.serviceCarrier) ? phonePlan.serviceCarrier : false;

    // check if phone plan data is present or not
    if (phonePlan && phonePlan.serviceCarrier) {
        // save phone plan data to the database
        const newPhonePlan = await addPlan(phonePlan);

        console.log(newPhonePlan);
        res.status(newPhonePlan.statusCode).json({
            status: newPhonePlan.status,
            message: newPhonePlan.message,
        });
    } else {
        res.status(400).json({
            status: "bad request",
            message: "There is problem with input data",
        });
    }
};

// view phone plan data
phonePlan.view = async (req, res, next) => {

    console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        // take phone plan id form the request query
        const phonePlanId = typeof (req.query.plan) === "string" && req.query.plan.length > 0 ? req.query.plan : false;

        // take phone plan id form the request query
        const serviceCarrierId = typeof (req.query.serviceCarrier) === "string" && req.query.serviceCarrier.length > 0 ? req.query.serviceCarrier : false;

        // find plan data based on query type
        const planData = phonePlanId ? await planViewByID(phonePlanId) : await planViewByServiceCarrierID(serviceCarrierId);


        // send response to user
        if (planData) {
            const statusCode = planData.statusCode;
            planData.statusCode = undefined;
            res.status(statusCode).json(planData);
        }
        else {
            res.status(500).json({
                status: "server error",
                data: "There is an internal error, please try again.",
            });
        }
    } else {
        res.status(404).json({
            status: "not found",
            data: "Please provide valid phone plan id",
        });
    }

}


// update phone plan data
phonePlan.update = async (req, res, next) => {

    // console.log(req.body.phonePlan);

    // take phone plan id form the request query
    const phonePlanId = typeof (req.body.phonePlan.id) === "string" && req.body.phonePlan.id.length > 0 && mongoose.isValidObjectId(req.body.phonePlan.id) ? req.body.phonePlan.id : false;

    // console.log(phonePlanId)
    // take phone plan data from the request body and make id undefined
    const phonePlanData = typeof (req.body.phonePlan) === "object" ? req.body.phonePlan : false;

    phonePlanData.id = undefined;
    // console.log(phonePlanData)
    // find phone plan data by id
    try {
        const phonePlanUpdatedData = await PhonePlan.findByIdAndUpdate(phonePlanId, phonePlanData);

        console.log(phonePlanUpdatedData)
        if (phonePlanUpdatedData) {
            res.status(200).json({
                status: "success",
                message: "Phone plan data updated successfully",
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid phone plan id",
            });
        }
    } catch (err) {
        console.log(err)
        const error = new AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
};


phonePlan.remove = async (req, res, next) => {
    // take phone plan id form the request query
    const phonePlanId = typeof (req.query.id) === "string" && req.query.id.length > 0 && mongoose.isValidObjectId(req.query.id) ? req.query.id : false;


    // find phone plan data by id
    try {
        const phonePlanData = await PhonePlan.findByIdAndDelete(phonePlanId);

        if (phonePlanData) {
            res.status(200).json({
                status: "success",
                message: "phone plan is deleted successfully"
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid phone plan id",
            });
        }
    } catch (err) {
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
}

// export module
module.exports = phonePlan;