// Dependencies
const express = require('express');
const { add } = require('../../controllers/serviceCarrier/serviceCarrierController')

// module scafolding
const router = express.Router();

router
    .route('/add')
    .post(add);




// export module
module.exports = router;