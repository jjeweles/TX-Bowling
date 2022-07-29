// require mongoose
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const tourneySchema = new mongoose.Schema({
    tourneyName: String,
    tourneyDate: Date,
    tourneyCity: String,
    tourneyImg:
        {
            data: Buffer,
            contentType: String,
        },
    tourneyContactName: {
        type: String,
        default: null
    },
    tourneyContactEmail: {
        type: String,
        default: null
    },
    tourneyContactPhone: {
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