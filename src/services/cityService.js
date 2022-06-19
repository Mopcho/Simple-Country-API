const {City} = require('../models/City.js');

async function getByCountryAndSort(countryName,sortName,sortPop,limit,skip) {
    //Get cities in a specific country and sort them
    if(sortName == '' && sortPop == '') {
        let cities = await City
        .find({countryName : countryName})
        .populate({path : 'populationCounts'})
        .limit(limit).skip(skip);

        return cities;
    } else {
        let cities = await City
        .find({countryName : countryName})
        .sort({'name' : sortName})
        .populate(
            {path : 'populationCounts',
            options:{ sort: [{'value' :  sortPop}] 
        }})
        .limit(limit).skip(skip);

        return cities;
    }
}

async function getByCountryAndCity(countryName,cityName,limit,skip) {
    let city = await City
    .findOne({countryName : countryName, name : cityName})
    .populate('populationCounts')
    .limit(limit).skip(skip);

    return city;
}

module.exports = {
    getByCountryAndSort,
    getByCountryAndCity
}