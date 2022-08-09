const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const indexController = require('../controllers/indexController');

router.get('/', wrapAsync(indexController.getIndex));

router
    .route('/chat')
    .get(wrapAsync(indexController.getChat))
    .post(indexController.postChat);

router
    .route('/chat/:id')
    .get(wrapAsync(indexController.getChatThread))
    .post(wrapAsync(indexController.postChatReply))
    .delete(wrapAsync(indexController.deleteChatReply))
    .delete(wrapAsync(indexController.deleteChat));

module.exports = router;
