// Dependencies
const date = require("date-and-time");
const now = new Date();
const SimCard = require("../../models/simCardModels/simCardModel");
const AppError = require("../../controllers/error/appError");
const logger = require("../../utilities/logger");
const { dateNow } = require("../../utilities/utils");
const { addSimCard, updateSimCard, viewSimData } = require("./simCardHelper");
const ObjectId = require('mongodb').ObjectId;



// Module Scafolding
const simCardControlers = {};


// method to control add sim card route
simCardControlers.addSim = async (req, res, next) => {
    // check the sim adding method
    const simAddingMethod = req.body.simAddingMethod;

    if (simAddingMethod === "manually") {

        // insert sim card data to database
        const insertSimStatus = await addSimCard(req.body.simCardData);

        console.log(insertSimStatus);

        if (insertSimStatus.status === "success") {

            /**
             * !todo: sim status operation
             */


            res.status(200).json({
                status: "success",
                message: "sim card inserted successfully.",
            });
        } else if (insertSimStatus.error) {
            next(insertSimStatus.error);
        }
        else {
            res.status(500).json(
                {
                    status: "server error",
                    message: "there is an internal server error"
                }
            );
        }



    } else if (simAddingMethod === "auto") {

    } else {
        res.status(400).json({
            status: "bad request1",
            data: {
                message: "Please provide proper sim card adding method",
            },
        });
    }
};




// method to handle update sim card route
simCardControlers.updateSim = async (req, res, next) => {

    if (req.body.simData) {
        const updatedSim = await updateSimCard(req.body.simData);
        console.log(updatedSim)
    }
    else {
        const err = new AppError(400, "bad request", "please provide valid input");
        next(err);
    }

};




// sim card data request controler
simCardControlers.simCardData = async (req, res, next) => {
    const _id = typeof req.body._id === "string" ? ObjectId(req.body._id) : false;

    if (_id) {
        // find sim card data by id
        const simData = await viewSimData(_id);

        if (simData.status === "success") {
            res.status(200).json({
                status: "success",
                data: simData.data
            });
        } else if (simData.status === "fail" && simData.data == null) {
            res.status(400).json({
                status: "bad request",
                message: "no data found with this id"
            });
        } else {
            res.status(500).json({
                status: "server error",
                message: "There is an internal server error"
            });
        }

    } else {
        // find all sim card data and send with response
        const simData = await viewSimData();
        console.log(simData);

        if (simData.status === "success") {
            res.status(200).json({
                status: "success",
                data: simData.data
            });
        } else if (simData.status === "fail" && simData.data == null) {
            res.status(400).json({
                status: "success",
                message: "No data found"
            });
        } else {
            res.status(500).json({
                status: "server error",
                message: "There is an internal server error"
            });
        }
    }
};

// Export Module
module.exports = simCardControlers;