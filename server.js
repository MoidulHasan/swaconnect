/**
 * Title: server
 * Descriptions: create server
 * Author: Modidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const environment = require("./config/environment")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utilities/logger');
const database = require('./config/db');
const app = require('./app');

// Database Connection
database.connect();

// configure environment
dotenv.config();

// handle uncaught Exception error
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    logger.error(err.name, err.message);
    process.exit(1);
});



// Start the server
app.listen(environment.port, () => {
    console.log(`Application is running on port ${environment.port}`);
    logger.info(`Application is running on port ${environment.port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    logger.error('UNHANDLED REJECTION!!!  shutting down ...');
    logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});