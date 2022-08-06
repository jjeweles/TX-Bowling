const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const indexController = require('../controllers/indexController');

router.get('/', wrapAsync(indexController.getIndex));

router.get('/chat', indexController.getChat);

module.exports = router;
