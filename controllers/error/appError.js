/**
 * Title: App error
 * Descriptions: Error constractor creating new error
 * Author: Moidul Hasan Khan
 * Date: 24/03/2022
 */

// Dependencies


class AppError extends Error {
    constructor(statusCode, status, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}

// export module
module.exports = AppError;