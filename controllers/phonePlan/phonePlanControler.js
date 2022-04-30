// dependencies
const mongoose = require("mongoose");
const PhonePlan = require("../../models/serviceModels/phonePlanModel")
const AppError = require("../error/appError");
const { addPlan } = require("./phonePlanHelpers");

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

    // console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        // take phone plan id form the request query
        const phonePlanId = typeof (req.query.id) === "string" && req.query.id > 0 ? req.query.id : false;

        // const phonePlanObjectId = mongoose.Types.ObjectId(phonePlanId);
        // console.log("object id: ", phonePlanObjectId);

        // find phone plan data by id
        try {
            const phonePlanData = await PhonePlan.findOne({ id: phonePlanId });

            if (phonePlanData) {
                console.log(typeof phonePlanData.id)
                res.status(200).json({
                    status: "success",
                    data: phonePlanData,
                });
            } else {
                res.status(404).json({
                    status: "not found",
                    data: "Please provide valid phone plan id",
                });
            }
        } catch (err) {
            const error = new AppError(500, "server error", "There is an internal server error, please try again letter");
            next(error);
        }
    } else {


        // find all phone plan data
        try {
            const phonePlanData = await PhonePlan.find();

            if (phonePlanData) {
                res.status(200).json({
                    status: "success",
                    data: phonePlanData,
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

}


// update phone plan data
phonePlan.update = async (req, res, next) => {

    console.log(req.body.phonePlan);

    // take phone plan id form the request query
    const phonePlanDataId = typeof (req.body.phonePlan.id) === "number" && req.body.phonePlan.id > 0 ? req.body.phonePlan.id : false;

    // take phone plan data from the request body and make id undefined
    const phonePlanData = typeof (req.body.phonePlan) === "object" ? req.body.phonePlan : false;

    // find phone plan data by id
    try {
        const phonePlanUpdatedData = await PhonePlan.findOneAndUpdate({ id: phonePlanDataId }, phonePlanData);

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
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
};


phonePlan.remove = async (req, res, next) => {
    // take phone plan id form the request query
    const phonePlanId = req.query.id;

    // find phone plan data by id
    try {
        const phonePlanData = await PhonePlan.findOneAndDelete({ id: phonePlanId });

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