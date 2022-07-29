const wrapAsync = require("../utils/wrapAsync");
const Bowler = require("../models/itabowlers.js");
const Tourney = require("../models/tournaments.js");

module.exports.getCalendar = (req, res) => {
    res.render('calendar');
}

module.exports.addTourney = (req, res) => {
    res.render('addtourney');
}

module.exports.addTourneyToDB = wrapAsync(async (req, res, next) => {
    const newTourney = new Tourney({
        tourneyName: req.body.tournamentName,
        tourneyDate: req.body.tournamentDate,
        tourneyCity: req.body.tournamentLocation,
        tourneyContactName: req.body.tournamentContactName,
        tourneyContactEmail: req.body.tournamentContactEmail,
        tourneyContactPhone: req.body.tournamentContactPhone
    });
    newTourney.save()
        .then(() => console.log('Tourney added to database'))
        .catch(err => console.error('Error adding tourney to database', err));
    res.redirect('/addtourney');
})

module.exports.getItaAverages = wrapAsync(async (req, res, next) => {
    // variables for the query
    let {page, limit} = req.query;
    // options for the pagination
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 50,
        sort: {
            'lastName': 1,
            'firstName': 1
        }
    }
    // paginate the bowlers in the database
    let bowler = await Bowler.paginate({}, options);
    let page_list = bowler.totalPages;
    let prevPage = bowler.hasPrevPage;
    let nextPage = bowler.hasNextPage;

    let bowlers = bowler.docs;
    res.render('itaaverages', {bowlers, page_list, page: 1, nextPage, prevPage});
})

module.exports.getItaSearch = wrapAsync(async (req, res, next) => {
    const {page, limit} = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 50,
        sort: {
            'lastName': 1,
            'firstName': 1
        }
    }
    let bowler = await Bowler.paginate({}, options);
    let page_list = bowler.totalPages;
    let prevPage = bowler.hasPrevPage;
    let nextPage = bowler.hasNextPage;

    // function to capitalize first letter and leave rest lowercase on user input
    function toTitleCase(str) {
        if (!req.body.query) return;
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    // capture form submit data and convert to title case
    const lastName = toTitleCase(req.body.query);
    // find bowler with lastName entered and sort by lastName and then firstName
    const bowlers = await Bowler.find({'lastName': lastName}).sort({'firstName': 1});
    res.render('itaaverages', {bowlers, page_list, page: 1, nextPage, prevPage});
})