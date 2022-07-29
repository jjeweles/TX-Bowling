module.exports.getAustin = (req, res) => {
    res.render('cities/austin');
}

module.exports.getDallas = (req, res) => {
    res.render('cities/dallas');
}

module.exports.getHouston = (req, res) => {
    res.render('cities/houston');
}

module.exports.getSanAntonio = (req, res) => {
    res.render('cities/sanantonio');
}

module.exports.getOther = (req, res) => {
    res.render('cities/other');
}
