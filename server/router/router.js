const express = require('express');
const getuserFormDyanmicFields = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');
const router = express.Router();


router.get('/getDynamicFields', userMiddleware, getuserFormDyanmicFields)


module.exports = router;