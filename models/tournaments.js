// require mongoose
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const tourneySchema = new mongoose.Schema({
    tournamentName: String,
    tournamentDate: [],
    tournamentLocation: String,
    tournamentFlyer: [
        {
            url: String,
            filename: String
        }
    ],
    tournamentContactName: {
        type: String,
        default: null
    },
    tournamentContactEmail: {
        type: String,
        default: null
    },
    tournamentContactPhone: {
        type: String,
        default: null
    }
}, {
    collection: 'tourneys'
});
tourneySchema.plugin(paginate);
// create variable to call Schema
const Tourney = mongoose.model('Tourney', tourneySchema);

// export bowlers for use in other files
module.exports = Tourney;