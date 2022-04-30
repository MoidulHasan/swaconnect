// Dependencies
const PhonePlan = require("../../models/serviceModels/phonePlanModel");
const AppError = require("../error/appError");
const serviceCarrier = require("../../models/serviceModels/serviceCarrierModel");


// Module Scafolding
const helpers = {};

helpers.addPlan = async (planData) => {
    const output = {};


    // check if phone plan data is present or not
    if (planData) {
        // check the service carrier is exist or not
        const serviceCarrierStatus = await serviceCarrier.findById(planData.serviceCarrier);

        if (!serviceCarrierStatus) {
            output.status = "fail";
            output.statusCode = 400;
            output.message = "No service carrier exist with this id";
            return output;
        }

        // save phone plan data to the database
        try {
            // find last inserted id 
            const lastId = await PhonePlan.findOne().sort('-id');
            if (lastId) {
                // add new id to sim card data
                let newId = parseInt(lastId.id) + 1;
                planData.id = typeof (newId) === "number" ? newId : false;
            }

            // console.log("phone plan: ", planData)
            const newPlanData = await PhonePlan.create(planData);

            // console.log(newPlanData);

            // if new phone plan inserted then assign success response to output
            if (newPlanData && newPlanData._id) {
                // add this plan data to service carrier
                const newServiceCarrier = await serviceCarrier.findByIdAndUpdate(planData.serviceCarrier, { $push: { phonePlans: newPlanData._id } });

                if (newServiceCarrier._id) {
                    output.status = "success";
                    output.statusCode = 200;
                    output.message = "plan added successfully";
                    output.data = newPlanData;
                }
                else {
                    output.statusCode = 500;
                    output.message = "server error";
                }
            }
            else {
                output.statusCode = 500;
                output.message = "server error";
            }
        } catch (err) {
            return err;
        }
    } else {
        output.status = "bad request";
        output.message = "There is problem with input data";
    }

    return output;
};


// export module
module.exports = helpers;