// require mongoose
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const bowlerSchema = new mongoose.Schema({
    _id: String,
    id: Number,
    lastName: String,
    firstName: String,
    mInitial: String,
    suffix: String,
    city: String,
    totalPins: Number,
    currGames: Number,
    currAvg: Number,
    sevenTwoAvg: Number,
}, {
    collection: 'itas'
});
bowlerSchema.plugin(paginate);
// create variable to call Schema
const Bowler = mongoose.model('Bowler', bowlerSchema);

// export bowlers for use in other files
module.exports = Bowler;