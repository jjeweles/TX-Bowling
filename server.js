if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/** @member {Object} */
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/users.js');
const { errorHandler } = require('./utils/errorHandler');
const indexRoutes = require('./routes/indexRoutes');
const cityRoutes = require('./routes/cityRoutes');
const tourneyRoutes = require('./routes/tourneyRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/txtourneys';

// Connect to MongoDB
mongoose
    .connect(dbUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/', cityRoutes);
app.use('/', tourneyRoutes);
app.use('/', userRoutes);

// error handler for pages that don't exist
app.all('*', (req, res) => {
    res.render('404');
});

// error handler for all other errors
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening On Port ${port}...`);
});
