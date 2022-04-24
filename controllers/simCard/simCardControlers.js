// Dependencies
const date = require("date-and-time");
const now = new Date();
const SimCard = require("../../models/simCardModels/simCardModel");
const AppError = require("../../controllers/error/appError");
const logger = require("../../utilities/logger");
const { dateNow } = require("../../utilities/utils");
const { addSimCard } = require("./simCardHelper");

// Module Scafolding
const simCardControlers = {};

simCardControlers.add = async (req, res, next) => {
    // check the sim adding method
    const simAddingMethod = req.body.simAddingMethod;

    if (simAddingMethod === "manually") {

        // insert sim card data to database
        const insertSimStatus = await addSimCard(req.body.simCardData);

        console.log(insertSimStatus);


    } else if (simAddingMethod === "auto") { } else {
        res.status(400).json({
            status: "bad request",
            data: {
                message: "Please provide proper sim card adding method",
            },
        });
    }
};

// Add single sim card
// simCardControlers.addSingleSimCard = async (simCardData) => {
//     let result = {};
//     try {

//         // 2) if sim card exist then assign error to output
//         if (simExistStatus) {
//             const error = new AppError(
//                 400,
//                 "bad request",
//                 "This SSID is already registered"
//             );
//             result.error = error;
//         } else {
//             // 3) find last inserted sim card id
//             const lastId = await SimCard.findOne().sort("-id");
//             if (lastId) {
//                 // 4) add new id to sim card data
//                 let newId = parseInt(lastId.id) + 1;
//                 simCardData.id = typeof newId === "number" ? newId : false;
//             }

//             // 5) if sim card not exist then insert sim card data to database
//             const newSimCart = await SimCard.create(simCardData);

//             // 6) if sim card inserted then assign success response to output
//             if (newSimCart) {
//                 result.statusCode = 201;
//                 result.status = "Success";
//                 result.message = "new sim card added";
//             }
//         }
//     } catch (err) {
//         console.log(err);
//         // console.log("error catched", err);
//         // check if error is validation error
//         if (err.name === "ValidationError") {
//             // console.log("Validation error occured")
//             // take all error to errors object
//             let errors = {};
//             Object.keys(err.errors).forEach((key) => {
//                 errors[key] = err.errors[key].message;
//             });

//             // construct error and assign to output
//             const error = new AppError(
//                 500,
//                 "bad request",
//                 "sim card data validation error"
//             );
//             error.allErrors = errors;
//             result.error = error;
//         } else {
//             // if error is not validation error then save it to log file and create and assign an server error to output
//             logger.error(err);
//             const error = new AppError(
//                 500,
//                 "Server Error",
//                 "There is an internal server error, please try again letter"
//             );
//             result.error = error;
//         }
//     }
//     return result;
// };

// sim card data request controler
simCardControlers.simCardData = async (req, res, next) => {
    const id = typeof req.body.id === "number" ? req.body.id : false;
    if (id) {
        // console.log(req.body.id);

        // find sim card data by sim card id
        try {
            const simData = await SimCard.findOne({ id: id });
            // console.log(simData)

            if (simData) {
                // console.log(allSimData)
                res.status(200).json({
                    status: "success",
                    data: simData,
                });
            } else {
                res.status(200).json({
                    status: "success",
                    data: null,
                    message: "no data found",
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "server error",
                message: "there is an internal server error",
            });
            // console.log(err);
        }
    } else {
        // find all sim card data and send with response
        try {
            const allSimData = await SimCard.find();
            // console.log(allSimData)

            if (allSimData.length > 0) {
                // console.log(allSimData)
                res.status(200).json({
                    status: "success",
                    data: allSimData,
                });
            } else {
                res.status(200).json({
                    status: "success",
                    data: null,
                    message: "no data found",
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "server error",
                message: "there is an internal server error",
            });
            // console.log(err);
        }
    }
};

// Export Module
module.exports = simCardControlers;