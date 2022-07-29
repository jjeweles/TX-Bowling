/** @member {Object} */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const cities = require('./routes/cities');
const tourneys = require('./routes/tourneys');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/txtourneys', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/css", express.static(__dirname + "node_modules/bootstrap/css"));
app.use("/js", express.static(__dirname + "node_modules/bootstrap/js"));
app.use("/js", express.static(__dirname + "node_modules/jquery/js"));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', cities);
app.use('/', tourneys);

app.get('/forums', (req, res) => {
    res.render('forums');
});

// error handler for pages that don't exist
app.all('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log('Listening On Port 3000');
});
