/**
 * Title: Global error handler
 * Descriptions: Handle Global error of this app
 * Author: Moidul Hasan Khan
 * Date: 24/03/2022
 */

// Dependencies


// Module Scafolding
const handler = {};

// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
handler.globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'server error';

    res.status(err.statusCode).json({
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

// export module
module.exports = handler.globalErrorHandler;