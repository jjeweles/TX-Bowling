const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

router
    .route('/register')
    .get(isLoggedIn, userController.getRegisterPage)
    .post(wrapAsync(userController.registerUser));

router
    .route('/login')
    .get(userController.getLoginPage)
    .post(
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login',
            keepSessionInfo: true,
        }),
        wrapAsync(userController.loginUser)
    );

router.get('/logout', wrapAsync(userController.logoutUser));

module.exports = router;
