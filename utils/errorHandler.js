module.exports.errorHandler = (err, req, res, next) => {
    const {status = 500, message = 'Something Went Wrong'} = err;
    console.log(err)
    res.render('error', {status, message});
}