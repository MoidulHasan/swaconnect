// Dependencies
const express = require('express');
const { add, view } = require('../../controllers/serviceCarrier/serviceCarrierController')

// module scafolding
const router = express.Router();

router
    .route('/add')
    .post(add);


router
    .route("/view")
    .get(view);




// export module
module.exports = router;