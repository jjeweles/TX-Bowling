const express = require('express');
const tourneyController = require("../controllers/tourneyController.js");
const router = express.Router();

const tourneyAuth = (req, res, next) => {
    next();
}

router.get('/calendar', tourneyController.getCalendar);

router.get('/addtourney', tourneyController.addTourney);

router.post('/addtourneypost', tourneyAuth, tourneyController.addTourneyToDB);

router.get('/itaaverages', tourneyController.getItaAverages);

router.post('/itasearch', tourneyController.getItaSearch);

module.exports = router;