/**
 * Title: Signup Router
 * Descriptions: Provide route handler for register new user
 * Author: Moidul Hasan Khan
 * Date: 05/04/2022
 */

// Dependencies
const express = require('express');
const authController = require('../../controllers/auth/authControler');

// module scafolding
const router = express.Router();

router
    .route('/')
    .post(authController.signup);




// export module
module.exports = router;