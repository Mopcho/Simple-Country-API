const countryService = require('../services/countryService');
const router = require('express').Router();

router.get('/',async (req,res,next)=> {
    let sort = req.query.sort;

    const limit = req.limit;
    const skip = req.skip;

    try {
        if(!sort) {
            let countries = await countryService.getAll(limit,skip);
            res.json(countries);
        } else {
            let countries = await countryService.getAllSort(sort,limit,skip);
            res.json(countries);
        }
    } catch (err) {
        next(err,req,res);
    }
});

router.get('/:countryName',async (req,res)=> {
    try {
        let country = await countryService.getByName(req.params.countryName);
        res.json(country);
    } catch (err) {
        next(err,req,res);
    }

});

router.get('/:countryName/cities', async (req,res)=> {
    const limit = req.limit;
    const skip = req.skip;
    const countryName = req.params.countryName;

    try {
        let cities = await countryService.getAllCititesByCountry(countryName,limit,skip);
    
        res.json(cities);
    } catch (err) {
        next(err,req,res);
    }
});

exports.countryController = router;

