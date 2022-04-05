/**
 * Title: loggoer
 * Descriptions: Logger utilite that provide better loging functionalities for better debugging
 * Author: Modidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
// const environment = require("../config/environment")
const { createLogger, format, transports } = require('winston');


const myformat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'logs/server.log',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
        new transports.Console({
            format: myformat
        })
    ]
});


module.exports = logger;