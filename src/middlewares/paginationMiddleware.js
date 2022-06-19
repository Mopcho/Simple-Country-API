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

    // if (endIndex < await model.countDocuments().exec()) {
    //     results.next = {
    //         page : page + 1,
    //         limit : limit
    //     }
    // }
    // if (startIndex > 0 ) {
    //     results.previous = {
    //         page : page - 1,
    //         limit : limit
    //     }
    // }
}