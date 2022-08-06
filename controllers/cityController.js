const Tourney = require('../models/tournaments.js');

let getTournament = async (city) => {
    return Tourney.find({ tournamentLocation: city }).sort({
        tournamentDate: 1,
    });
};

module.exports.getAustin = async (req, res) => {
    let tournaments = await getTournament('austin');
    res.render('cities/austin', { tournaments });
};

module.exports.getDallas = async (req, res) => {
    let tournaments = await getTournament('dallas');
    res.render('cities/dallas', { tournaments });
};

module.exports.getHouston = async (req, res) => {
    let tournaments = await getTournament('houston');
    res.render('cities/houston', { tournaments });
};

module.exports.getSanAntonio = async (req, res) => {
    let tournaments = await getTournament('sanantonio');
    res.render('cities/sanantonio', { tournaments });
};

module.exports.getOther = async (req, res) => {
    let tournaments = await getTournament('other');
    res.render('cities/other', { tournaments });
};
