const express = require('express');
const tourneyController = require('../controllers/tourneyController.js');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary/index.js');
const wrapAsync = require('../utils/wrapAsync');
const upload = multer({ storage });
const { isLoggedIn } = require('../middleware');

router.get('/calendar', tourneyController.getCalendar);

router.get('/addtourney', isLoggedIn, tourneyController.addTourney);

router.post(
    '/addtourneypost',
    isLoggedIn,
    upload.array('tournamentFlyer'),
    wrapAsync(tourneyController.addTourneyToDB)
);

router.get('/itaaverages', wrapAsync(tourneyController.getItaAverages));

router.post('/itasearch', wrapAsync(tourneyController.getItaSearch));

router
    .route('/tournaments/:id')
    .get(wrapAsync(tourneyController.getTournament))
    .put(
        isLoggedIn,
        upload.array('tournamentFlyer'),
        wrapAsync(tourneyController.updateTournament)
    )
    .delete(isLoggedIn, wrapAsync(tourneyController.deleteTournament));

router.get(
    '/tournaments/:id/edit',
    isLoggedIn,
    wrapAsync(tourneyController.editTournament)
);

module.exports = router;
