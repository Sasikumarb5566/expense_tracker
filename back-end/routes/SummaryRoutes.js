const express = require('express');
const router = express.Router();
const {addSummaryUser, getAllUsers, getIndividualDetails} = require('../controllers/SummaryControllers');

router.post('/summaryuser', addSummaryUser);
router.get('/alluser', getAllUsers);
router.get('/details', getIndividualDetails);

module.exports = router;