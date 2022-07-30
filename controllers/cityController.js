const Tourney = require("../models/tournaments.js");

module.exports.getAustin = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "Austin"});
    res.render('cities/austin', {tournaments});
}

module.exports.getDallas = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "Dallas"});
    res.render('cities/dallas', {tournaments});
}

module.exports.getHouston = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "Houston"});
    res.render('cities/houston', {tournaments});
}

module.exports.getSanAntonio = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "San Antonio"});
    res.render('cities/sanantonio', {tournaments});
}

module.exports.getOther = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "Other"});
    res.render('cities/other', {tournaments});
}
