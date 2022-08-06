const Bowler = require('../models/itabowlers.js');
const Tourney = require('../models/tournaments.js');
const moment = require('moment');

module.exports.getCalendar = (req, res) => {
    res.render('calendar');
};

module.exports.addTourney = (req, res) => {
    res.render('addtourney');
};

module.exports.addTourneyToDB = async (req, res, next) => {
    const newTourney = new Tourney(req.body);
    newTourney.tournamentFlyer = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
    }));
    newTourney.save();
    req.flash('success', 'Tournament added successfully!');
    res.redirect('/addtourney');
};

module.exports.getItaAverages = async (req, res, next) => {
    // variables for the query
    let { page, limit } = req.query;
    // options for the pagination
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 50,
        sort: {
            lastName: 1,
            firstName: 1,
        },
    };
    // paginate the bowlers in the database
    let bowler = await Bowler.paginate({}, options);
    let page_list = bowler.totalPages;
    let prevPage = bowler.hasPrevPage;
    let nextPage = bowler.hasNextPage;

    let bowlers = bowler.docs;
    res.render('itaaverages', {
        bowlers,
        page_list,
        page: 1,
        nextPage,
        prevPage,
    });
};

module.exports.getItaSearch = async (req, res, next) => {
    const { page, limit } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 50,
        sort: {
            lastName: 1,
            firstName: 1,
        },
    };
    let bowler = await Bowler.paginate({}, options);
    let page_list = bowler.totalPages;
    let prevPage = bowler.hasPrevPage;
    let nextPage = bowler.hasNextPage;

    // function to capitalize first letter and leave rest lowercase on user input
    function toTitleCase(str) {
        if (!req.body.query) return;
        return str.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

    // capture form submit data and convert to title case
    const lastName = toTitleCase(req.body.query);
    // find bowler with lastName entered and sort by lastName and then firstName
    const bowlers = await Bowler.find({ lastName: lastName }).sort({
        firstName: 1,
    });
    res.render('itaaverages', {
        bowlers,
        page_list,
        page: 1,
        nextPage,
        prevPage,
    });
};

module.exports.getTournament = async (req, res, next) => {
    const { id } = req.params;
    const tournament = await Tourney.findById(id);
    res.render('tournament', { tournament });
};

module.exports.editTournament = async (req, res, next) => {
    const { id } = req.params;
    const tournament = await Tourney.findById(id);
    const tournamentDate = moment(tournament.tournamentDate)
        .locale('en')
        .format('YYYY-MM-DD');
    res.render('edittourney', { tournament, tournamentDate });
};

module.exports.updateTournament = async (req, res, next) => {
    const { id } = req.params;
    const tournament = await Tourney.findByIdAndUpdate(id, { ...req.body });
    req.flash('success', 'Tournament updated successfully!');
    res.redirect(`/tournaments/${id}`);
};

module.exports.deleteTournament = async (req, res, next) => {
    const { id } = req.params;
    let city = await Tourney.findById(id);
    city = city.tournamentLocation;
    const tournament = await Tourney.findByIdAndDelete(id);
    req.flash('success', 'Tournament deleted successfully!');
    res.redirect(`/${city}`);
};
