/**
 * Title: Swaconnect Main App
 * Descriptions: This is the main app of Swaconnect rest api
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");


const appError = require("./controllers/error/appError");
const globalErrorHandler = require("./controllers/error/globalError");
const routeHandler = require("./routes/router");
const logger = require("./utilities/logger");


// Module Scafolding
const app = express();

/**
 * @Middleware_Functions
 * ------------------------------------------------------------------------------------------------------------------------
 */


// parse json data from user
app.use(express.json());

// Allow Cross Origin Request
app.use(cors({
    "origin": "*",
}));

// Set Security HTTP Header
app.use(helmet());

// Apply Rate Limiting Middleware to all request
// const limiter = rateLimit({
//     max: 150,
//     windowMs: 60 * 60 * 1000,
//     message: "Request limit exixted from this IP, Please try again in an hour"
// });
// app.use(limiter);



// Sanitize input data against NOSQL injection
app.use(mongoSanitize());

// Sanitize input data against XSS(Sanitize Untrusted HTML)
app.use(xss());

// Prevent Parameter Population
app.use(hpp());

app.use((req, res, next) => {
    logger.info(req.url);
    next();
})

// Call route handler middleware
app.use(routeHandler);


// Handle global error
app.use(globalErrorHandler)

// Export Module
module.exports = app;