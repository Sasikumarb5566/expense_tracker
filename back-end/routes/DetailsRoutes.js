const express = require('express');
const router = express.Router();
const {addDetails} = require('../controllers/DetailsController')

router.post('/details', addDetails)

module.exports = router;