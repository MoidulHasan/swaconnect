// Dependencies
const express = require('express');
const { add } = require('../../controllers/simCard/simCardControlers')
const simCardOperationRoute = require("./operations/simCardOperations.route");


// module scafolding
const router = express.Router();

router
    .route('/add')
    .post(add);


// route handler for sim card operations route
router.use("/operation", simCardOperationRoute);




// export module
module.exports = router;