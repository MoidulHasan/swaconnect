// Dependencies
const AppError = require("../error/appError");
const Application = require("../../models/applicationModels/applicationModel")

// module schafolding
const application = {};


// create new application
application.add = async(req, res, next) => {
    try {
        // take user application data from the request body
        const applicationData = typeof(req.body.applicationData) === "object" ? req.body.applicationData : false;

        // check if application data is present or not
        if (applicationData) {

            // find the last application id if avalilable
            const lastId = await Application.findOne().sort('-id');
            if (lastId) {
                // 4) add new id to sim card data
                let newId = parseInt(lastId.id) + 1;
                applicationData.id = typeof(newId) === "number" ? newId : false;
            }

            // save application data to the database
            const applicationStatus = await Application.create(applicationData);
            // console.log(applicationStatus);
            if (applicationStatus) {
                res.status(200).json({
                    data: applicationStatus
                });
            }
        } else {
            const err = new AppError(400, "bad request", "there is problem with application data");
            next(err);
        }
    } catch (err) {

        // check if error is validation error
        if (err.name === "customError") {
            // send error response
            const statusCode = err.statusCode;
            err.statusCode = undefined;
            err.name = undefined;
            res.status(statusCode).json({
                error: err
            });
        } else {
            // if ther is other error
            const error = new AppError(500, "Server Error", "There is an internal server error, please try again letter");

            // send error response
            next(err)
        }
    }
};


// export module
module.exports = application;