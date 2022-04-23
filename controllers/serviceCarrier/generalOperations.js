// dependencies
const ServiceCarrier = require("../../models/serviceModels/serviceCarrierModel");

// module scafoldings
const operations = {};


// read single service carier data
operations.serviceCarrierData = async (id) => {
    if (id) {
        // find service carrier data by id
        try {
            const serviceCarrierData = await ServiceCarrier.findOne({ id: id }).select("+files +apiUserName +apiTokenPassword +clecid +apiPin +notes");


            if (serviceCarrierData) {
                return {
                    error: false,
                    data: serviceCarrierData
                }
            } else {
                return {
                    error: true,
                    data: false
                }
            }
        } catch (err) {
            return {
                error: err,
                data: false
            }
        }
    } else {
        return {
            error: true,
            data: false
        }
    }
};


// read all service carier data
operations.allServiceCarrierData = async () => {
    // find all service carrier data
    try {
        const serviceCarrierData = await ServiceCarrier.find();

        if (serviceCarrierData) {
            return {
                error: false,
                data: serviceCarrierData
            }
        } else {
            return {
                error: true,
                data: false
            }
        }
    } catch (err) {
        return {
            error: err,
            data: false
        }
    }
};


// export module
module.exports = operations;