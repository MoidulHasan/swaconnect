// Dependencies
const express = require('express');
const { addSim, simCardData, updateSim } = require('../../controllers/simCard/simCardControlers')
const simCardOperationRoute = require("./operations/simCardOperations.route");


// module scafolding
const router = express.Router();


router
    .route('/')
    .get(simCardData)
    .post(simCardData);


router
    .route('/add')
    .post(addSim);

router
    .route('/update')
    .post(updateSim);


// route handler for sim card operations route
router.use("/operation", simCardOperationRoute);




// export module
module.exports = router;