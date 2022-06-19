exports.glErrorHandler = (err,req,res,next) => {
    res.json({'Request' : 'Invalid',err});
}