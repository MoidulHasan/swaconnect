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
const loginRoute = require('./login/login.route');


// public router
router.all('/', baseRoutes);
router.use('/login', loginRoute);


// router.post('/login', authController.login);
// router.post('/signup', authController.signup);

// // Protect all routes after this middleware
// router.use(authController.protect);


// export module
module.exports = router;