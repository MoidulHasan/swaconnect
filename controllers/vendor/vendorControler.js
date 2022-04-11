// dependencies
const Vendor = require("../../models/vendorModels/vendorModel")
const AppError = require("../error/appError");

// module scafolding
const vendor = {};


// phone plan adding method
vendor.add = async(req, res, next) => {

    // take phone plan data form the request body
    const vendorData = typeof(req.body.vendor) === "object" ? req.body.vendor : false;


    // check if phone plan data is present or not
    if (vendorData) {
        // save phone plan data to the database
        try {
            // find last inserted id 
            const lastId = await Vendor.findOne().sort('-id');
            if (lastId) {
                // add new id to sim card data
                let newId = parseInt(lastId.id) + 1;
                vendorData.id = typeof(newId) === "number" ? newId : false;
            }

            // console.log("phone plan: ", phonePlan)
            const newVendorData = await Vendor.create(vendorData);

            // console.log(newVendorData);

            // if new phone plan inserted then assign success response to output
            if (newVendorData) {
                res.status(201).json({
                    status: "success",
                    message: "new vendor is added",
                });
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
    } else {
        res.status(400).json({
            status: "bad request",
            message: "There is problem with input data",
        });
    }
};


// view phone plan data
vendor.view = async(req, res, next) => {

    // console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        // take phone plan id form the request query
        const vendorId = typeof(req.query.id) === "string" && req.query.id > 0 ? req.query.id : false;

        // const phonePlanObjectId = mongoose.Types.ObjectId(phonePlanId);
        // console.log("object id: ", phonePlanObjectId);

        // find phone plan data by id
        try {
            const vendorData = await PhonePlan.findOne({ id: vendorId });

            if (vendorData) {
                // console.log(typeof vendorData.id)
                res.status(200).json({
                    status: "success",
                    data: vendorData,
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
vendor.update = async(req, res, next) => {

    console.log(req.body.phonePlan);

    // take phone plan id form the request query
    const phonePlanDataId = typeof(req.body.phonePlan.id) === "number" && req.body.phonePlan.id > 0 ? req.body.phonePlan.id : false;

    // take phone plan data from the request body and make id undefined
    const phonePlanData = typeof(req.body.phonePlan) === "object" ? req.body.phonePlan : false;

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


vendor.remove = async(req, res, next) => {
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