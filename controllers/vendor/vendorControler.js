// dependencies
const Vendor = require("../../models/vendorModels/vendorModel")
const AppError = require("../error/appError");

// module scafolding
const vendor = {};


// vendor adding method
vendor.add = async(req, res, next) => {

    // take vendor data form the request body
    const vendorData = typeof(req.body.vendor) === "object" ? req.body.vendor : false;


    // check if vendor data is present or not
    if (vendorData) {
        // save vendor data to the database
        try {
            // find last inserted id 
            const lastId = await Vendor.findOne().sort('-id');
            if (lastId) {
                // add new id to sim card data
                let newId = parseInt(lastId.id) + 1;
                vendorData.id = typeof(newId) === "number" ? newId : false;
            }

            // console.log("vendor: ", phonePlan)
            const newVendorData = await Vendor.create(vendorData);

            // console.log(newVendorData);

            // if new vendor inserted then assign success response to output
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


// view vendor data
vendor.view = async(req, res, next) => {

    // console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        // take vendor id form the request query
        const vendorId = typeof(req.query.id) === "string" && req.query.id > 0 ? req.query.id : false;

        // find vendor data by id
        try {
            const vendorData = await Vendor.findOne({ id: vendorId });

            if (vendorData) {
                // console.log(typeof vendorData.id)
                res.status(200).json({
                    status: "success",
                    data: vendorData,
                });
            } else {
                res.status(404).json({
                    status: "not found",
                    data: "Please provide valid vendor id",
                });
            }
        } catch (err) {
            const error = new AppError(500, "server error", "There is an internal server error, please try again letter");
            next(error);
        }
    } else {
        // find all vendor data
        try {
            const vendorData = await Vendor.find();

            // console.log(vendorData);
            if (vendorData) {
                res.status(200).json({
                    status: "success",
                    data: vendorData,
                });
            } else {
                res.status(404).json({
                    status: "not found",
                    data: "Please provide valid vendor id",
                });
            }
        } catch (err) {
            const error = new AppError(500, "server error", "There is an internal server error, please try again letter");
            next(error);
        }
    }

}


// update vendor data
vendor.update = async(req, res, next) => {

    // console.log(req.body.vendor);

    // take vendor id form the request query
    const vendorId = typeof(req.body.vendor.id) === "number" && req.body.vendor.id > 0 ? req.body.vendor.id : false;

    // take vendor data from the request body and make id undefined
    const vendorData = typeof(req.body.vendor) === "object" ? req.body.vendor : false;

    // find vendor data by id
    try {
        const vendorUpdatedData = await Vendor.findOneAndUpdate({ id: vendorId }, vendorData);

        if (vendorUpdatedData) {
            res.status(200).json({
                status: "success",
                message: "vendor data updated successfully",
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid vendor id",
            });
        }
    } catch (err) {
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
};


vendor.remove = async(req, res, next) => {
    // take vendor id form the request query
    const vendorId = req.query.id;

    // find vendor data by id
    try {
        const vendorData = await Vendor.findOneAndDelete({ id: vendorId });

        if (vendorData) {
            res.status(200).json({
                status: "success",
                message: "vendor is deleted successfully"
            });
        } else {
            res.status(404).json({
                status: "not found",
                data: "Please provide valid vendor id",
            });
        }
    } catch (err) {
        const error = AppError(500, "server error", "There is an internal server error, please try again letter");
        next(error);
    }
}

// export module
module.exports = vendor;