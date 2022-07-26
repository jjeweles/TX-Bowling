/** @member {Object} */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const Bowler = require('./models/itabowlers.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/txtourneys', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

/*
* light grey d3d6db
* darker grey 3a4750
* darkest grey 303841
* reddish color be3144
* */

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/css", express.static(__dirname + "node_modules/bootstrap/css"));
app.use("/js", express.static(__dirname + "node_modules/bootstrap/js"));
app.use("/js", express.static(__dirname + "node_modules/jquery/js"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/austin', (req, res) => {
    res.render('cities/austin');
});

app.get('/dallas', (req, res) => {
    res.render('cities/dallas');
});

app.get('/houston', (req, res) => {
    res.render('cities/houston');
});

app.get('/sanantonio', (req, res) => {
    res.render('cities/sanantonio');
});

app.get('/other', (req, res) => {
    res.render('cities/other');
});

app.get('/forums', (req, res) => {
    res.render('forums');
});

app.get('/addtourney', (req, res) => {
    res.render('addtourney');
});

app.get('/calendar', (req, res) => {
    res.render('calendar');
});

// route for getting all the bowlers
app.get('/itaaverages', async (req, res) => {
    // error handling
    try {
        // variables for the query
        let {page, limit} = req.query;
        // options for the pagination
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 50,
            sort: {
                'lastName': 1,
                'firstName': 1
            }
        }
        // paginate the bowlers in the database
        let bowler = await Bowler.paginate({}, options);
        let bowlers = bowler.docs;
        let page_list = bowler.totalPages;
        let prevPage = bowler.hasPrevPage;
        let nextPage = bowler.hasNextPage;
        console.log(req.query);
        res.render('itaaverages', {bowlers, page_list, page: 1, nextPage, prevPage});
    } catch (err) {
        console.error(err);
    }
});

app.post('/itasearch', async (req, res) => {
    // error handling
    try {
        const {page, limit} = req.query;
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(limit, 10) || 50,
            sort: {
                'lastName': 1,
                'firstName': 1
            }
        }
        let bowler = await Bowler.paginate({}, options);
        let page_list = bowler.totalPages;
        let prevPage = bowler.hasPrevPage;
        let nextPage = bowler.hasNextPage;

        // function to capitalize first letter and leave rest lowercase on user input
        function toTitleCase(str) {
            if(!req.body.query) return;
            return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }

        // capture form submit data and convert to title case
        const lastName = toTitleCase(req.body.query);
        // find bowler with lastName entered and sort by lastName and then firstName
        const bowlers = await Bowler.find({'lastName': lastName}).sort({'firstName': 1});
        res.render('itaaverages', {bowlers, page_list, page: 1, nextPage, prevPage});
    } catch (err) {
        console.error(err);
    }
});

// error handler for pages that don't exist
app.all('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
    console.log('Listening On Port 3000');
});
