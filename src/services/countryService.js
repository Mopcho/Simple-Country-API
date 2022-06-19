const {Country} = require('../models/Country.js');

async function getAll(limit,skip) {
    let countries = await Country.find().select('name').limit(limit).skip(skip);

    return countries;
}

async function getByName(name,limit,skip) {
    let country = await Country.findOne({name : name}).populate({path : 'cities', select : 'name'}).limit(limit).skip(skip);

    return country;
}

async function getAllSort(sort,limit,skip) {
    let countries = await Country.find().select('name').sort({name : sort}).limit(limit).skip(skip);

    return countries;
}

async function getAllCititesByCountry(countryName,limit,skip) {
    let citites = await Country.findOne({name : countryName}).populate('cities').select('name cities').limit(limit).skip(skip);

    return citites;
}

module.exports = {
    getAll,
    getByName,
    getAllSort,
    getAllCititesByCountry
}