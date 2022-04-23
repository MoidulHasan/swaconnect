// Dependencies
const express = require('express');
const { GetCoverage2 } = require('../../../controllers/simCard/simCardOperationsControler');

// module scafolding
const router = express.Router();

router
    .route('/GetCoverage2')
    .post(GetCoverage2);






// export module
module.exports = router;