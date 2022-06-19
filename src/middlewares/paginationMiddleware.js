exports.pagination = (req,res,next) => {
    let page = Number(req.query.page);
    let size = Number(req.query.size);

    if(!req.query.page) {
        page = 1;
    }
    if(!req.query.size) {
        size = 10;
    }
    const limit = size;
    const skip = (page-1) * size;

    req.limit = limit;
    req.skip = skip;

    next();
}