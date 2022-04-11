// Dependencies
const express = require('express');
const { add, view, update, remove } = require('../../controllers/serviceCarrier/phonePlanControler')

// module scafolding
const router = express.Router();

router
    .route("")
    .post(add)
    .get(view)
    .put(update)
    .delete(remove);




// export module
module.exports = router;