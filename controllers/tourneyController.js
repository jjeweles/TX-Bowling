const Bowler = require("../models/itabowlers.js");
const Tourney = require("../models/tournaments.js");

module.exports.getCalendar = (req, res) => {
    res.render('calendar');
}

module.exports.addTourney = (req, res) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    const years = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
    res.render('addtourney', {months, days, years});
}

module.exports.addTourneyToDB = async (req, res, next) => {
    const newTourney = new Tourney(req.body);
    newTourney.tournamentFlyer = req.files.map(file => ({url: file.path, filename: file.filename}));
    newTourney.save();
    res.redirect('/addtourney');
}

module.exports.getItaAverages = async (req, res, next) => {
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
}

module.exports.getItaSearch = async (req, res, next) => {
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
}