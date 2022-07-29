const express = require('express');
const router = express.Router();

router.get('/austin', (req, res) => {
    res.render('cities/austin');
});

router.get('/dallas', (req, res) => {
    res.render('cities/dallas');
});

router.get('/houston', (req, res) => {
    res.render('cities/houston');
});

router.get('/sanantonio', (req, res) => {
    res.render('cities/sanantonio');
});

router.get('/other', (req, res) => {
    res.render('cities/other');
});

module.exports = router;