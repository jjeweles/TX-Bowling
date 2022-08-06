const User = require('../models/users.js');

module.exports.getRegisterPage = (req, res) => {
    res.render('users/register');
};

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (e) => {
            if (e) {
                return next(e);
            }
            req.flash('success', 'You have successfully registered!');
            res.redirect('/');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};

module.exports.getLoginPage = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'You have successfully logged in!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logoutUser = async (req, res, next) => {
    const awaitLogout = await req.logout((e) => {
        if (e) {
            return next(e);
        }
        req.flash('success', 'You have successfully logged out!');
        return res.redirect('/');
    });
};
