const cityService = require('../services/cityService');
const router = require('express').Router();

router.get('/:countryName',async (req,res,next)=> {
    //Getting parameters
    let {sortName , sortPop} = req.query;
    let countryName = req.params.countryName;
    const limit = req.limit;
    const skip = req.skip;

    try {
        let cities = await cityService.getByCountryAndSort(countryName,sortName,sortPop,limit,skip);
        res.json(cities);
    } catch (err) {
        next(err,req,res);
    }

});

router.get('/:countryName/:cityName',async  (req,res)=> {
    let {countryName, cityName} = req.params;
    const limit = req.limit;
    const skip = req.skip;

    try {
        let city = await cityService.getByCountryAndCity(countryName, cityName,limit,skip);
        res.json(city);
    } catch (err) {
        next(err,req,res);
    }
}); 

exports.cityController = router;


