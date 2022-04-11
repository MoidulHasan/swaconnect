/**
 * Title: Main Router
 * Descriptions: Provide route handler for base url
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const express = require('express');
const router = express.Router();

// routes
const baseRoutes = require('./base');
const loginRouter = require('./login/login.route');
const logoutRouter = require('./logout/logout.route');
const signupRouter = require('./signup/signup.route');
const simCardRouter = require('./simcard/simcard.route');
const { authenticator } = require("../controllers/auth/authControler")
const applicationRouter = require("./application/application.route")
const serviceCarrierRouter = require("./serviceCarrier/serviceCarrier.route")
const phonePlanRouter = require("./serviceCarrier/phonePlan.route")
const vendorRouter = require("./vendor/vendorRouter")



// public router
router.all('/', baseRoutes);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/application', applicationRouter);



// Protect all routes after this middleware
router.use(authenticator);
router.use('/logout', logoutRouter);
router.use('/simcard', simCardRouter);
router.use('/servicecarrier', serviceCarrierRouter);
router.use('/phoneplan', phonePlanRouter);
router.use('/vendor', vendorRouter);



// export module
module.exports = router;