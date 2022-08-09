const Tourney = require('../models/tournaments.js');
const Chat = require('../models/tourneychat.js');
const Bowler = require("../models/itabowlers");

module.exports.getIndex = async (req, res) => {
    let tournament = await Tourney.find().sort({tournamentDate: 1}).limit(1);
    tournament = tournament[0];
    res.render('index', {tournament});
};

module.exports.getChat = async (req, res) => {
    // variables for the query
    let {page, limit} = req.query;
    // options for the pagination
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 5,
        sort: {
            createdAt: -1,
        },
    };
    // paginate the bowlers in the database
    let chat = await Chat.paginate({}, options);
    let page_list = chat.totalPages;
    let prevPage = chat.hasPrevPage;
    let nextPage = chat.hasNextPage;

    let chats = chat.docs;
    // let chat = await Chat.find({}).sort({createdAt: -1});
    res.render('chat', {chats, page_list, page: 1, nextPage, prevPage});
};

module.exports.postChat = async (req, res) => {
    const newChat = new Chat(req.body);
    await newChat.save();
    res.redirect('/chat');
}

module.exports.getChatThread = async (req, res) => {
    let id = req.params.id;
    let chat = await Chat.find({_id: id});
    res.render('chatthread', {chat});
};

module.exports.deleteChat = async (req, res) => {
    let id = req.params.id;
    const chat = await Chat.findByIdAndDelete(id);
    req.flash('success', 'Chat deleted successfully!');
    res.redirect('/chat');
}

module.exports.postChatReply = async (req, res) => {
    let id = req.params.id;
    let newReply = await Chat.findByIdAndUpdate(id, {$push: {chatReplies: req.body}});
    res.redirect('/chat/' + id);
}

module.exports.deleteChatReply = async (req, res) => {
    let id = req.params.id;
    let {replyID} = req.body;
    let chat = await Chat.findByIdAndUpdate(id, {$pull: {chatReplies: {_id: replyID}}});
    res.redirect('/chat/' + id);
}