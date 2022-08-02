const Tourney = require("../models/tournaments.js");

module.exports.getIndex = async (req, res) => {
    let tournament = await Tourney.find().sort({tournamentDate: 1}).limit(1);
    tournament = tournament[0];
    res.render('index', {tournament});
}

module.exports.getChat = (req, res) => {
    res.render('chat');
}