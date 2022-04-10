// Dependencies
const express = require('express');
const applicationControler = require('../../controllers/application/applicationControler');

// module scafolding
const router = express.Router();

router
    .route('/add')
    .post(applicationControler.add);




// export module
module.exports = router;