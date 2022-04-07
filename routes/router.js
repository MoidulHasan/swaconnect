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


// public router
router.all('/', baseRoutes);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);



// Protect all routes after this middleware
router.use(authenticator);
router.use('/logout', logoutRouter);
router.use('/simcard', simCardRouter);


// export module
module.exports = router;