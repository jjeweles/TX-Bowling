const Tourney = require("../models/tournaments.js");

module.exports.getAustin = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "austin"});
    res.render('cities/austin', {tournaments});
}

module.exports.getDallas = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "dallas"});
    res.render('cities/dallas', {tournaments});
}

module.exports.getHouston = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "houston"});
    res.render('cities/houston', {tournaments});
}

module.exports.getSanAntonio = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "sanantonio"});
    res.render('cities/sanantonio', {tournaments});
}

module.exports.getOther = async (req, res) => {
    let tournaments = await Tourney.find({tournamentLocation: "other"});
    res.render('cities/other', {tournaments});
}
