if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/** @member {Object} */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const AppError = require('./utils/AppError');
const {errorHandler} = require("./utils/errorHandler");
const indexRoutes = require('./routes/indexRoutes');
const cityRoutes = require('./routes/cityRoutes');
const tourneyRoutes = require('./routes/tourneyRoutes');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/txtourneys', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/css"));
app.use(express.static("node_modules/bootstrap/js"));
app.use(express.static("node_modules/jquery/js"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes)
app.use('/', cityRoutes);
app.use('/', tourneyRoutes);

// error handler for pages that don't exist
app.all('*', (req, res) => {
    res.render('404');
});

// error handler for all other errors
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening On Port 3000');
});
