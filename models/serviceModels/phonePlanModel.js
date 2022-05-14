// Dependencies
const mongoose = require("mongoose");


// schema scafolding
const phonePlanSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "phone plan id is required"],
        unique: true,
        select: true,
        default: 1001,
    },
    createdDate: {
        type: Date,
        required: [true, "plan creation date is required"],
        select: true,
        default: Date.now(),
    },
    name: {
        type: String,
        required: [true, "plan name is required"],
        select: true,
    },
    description: {
        type: String,
        required: [true, "plan description is required"],
        select: true,
    },
    serviceCarrier: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "service carrier id is required"],
        select: true,
    },
    planCode: {
        type: String,
        require: [true, "plan code is required"],
        select: true,
    }
});


// error handling middleware
const handleError = (error, doc, next) => {

    console.log(error);

    if (error.code === 11000) {
        const err = {
            name: "customError",
            statusCode: 400,
            status: "bad request",
            message: "This fields are already registerd",
            fields: error.keyValue,
        };
        next(err);
    } else if (error.name === "ValidationError") {
        // take all error to errors object
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });

        const err = {
            name: "customError",
            statusCode: 400,
            status: "bad request",
            message: "Please provide all required filed",
            errors: errors,
        };

        next(err);
    } else {
        next();
    }
};



// add error handling middleware after operation
phonePlanSchema.post("save", handleError);
phonePlanSchema.post("update", handleError);
phonePlanSchema.post("findOne", handleError);
phonePlanSchema.post("findOneAndUpdate", handleError);
phonePlanSchema.post("insertMany", handleError);


// export model
const phonePlan = mongoose.model("PhonePlan", phonePlanSchema);
module.exports = phonePlan;