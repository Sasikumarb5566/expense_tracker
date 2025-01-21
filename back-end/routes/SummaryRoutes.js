const express = require('express');
const router = express.Router();
const {addSummaryUser, getAllUsers} = require('../controllers/SummaryControllers');

router.post('/summaryuser', addSummaryUser);
router.get('/alluser', getAllUsers);

module.exports = router;