const mongoose = require('mongoose');
const {City} = require('../models/City');
const {Country} = require('../models/Country');
const {PopulationCount} = require('../models/PopulationCount');
const fetch = require('cross-fetch');


(async ()=> {
    try {
        await seedDataBase();
    } catch(err) {
        await disconnectDB();
    } 
})();

async function startDB() {
    await mongoose.connect('mongodb://localhost:27017/countries');

    if(mongoose.connection.collections['populationcounts']) {
        mongoose.connection.collections['populationcounts'].drop( function(err) {
            console.log('collection dropped');
        });
    }

    if(mongoose.connection.collections['countries']) {
        mongoose.connection.collections['countries'].drop( function(err) {
            console.log('collection dropped');
        });
    }

    if(mongoose.connection.collections['cities']) {
        mongoose.connection.collections['cities'].drop( function(err) {
            console.log('collection dropped');
        });
    } 
}

async function getData() {
    try {
      const res = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities');
      
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      const data = await res.json();

      return data.data;

    } catch (err) {
      console.error(err);
    }
}

async function disconnectDB() {
    console.log('Seeding Finished !');
    await mongoose.disconnect();
}

async function createCountry(countryName,cityId) {
    let country = new Country();

    country.name = countryName;

    country.cities.push(cityId);

    let dummyCountry = await country.save();

    return dummyCountry;
}

async function createPopulationCountsArray(index,data) {
    let populationArr = [];

    for (let a = 0 ; a < data[index].populationCounts.length; a++) {
        //Create populationCountDummy ( Only for more readability )
        let popDummy = data[index].populationCounts[a];

        //Create new population count with parameters
        let populationCount = new PopulationCount({
            year : popDummy.year,
            value : popDummy.value,
            sex : popDummy.sex,
            reliabilty : popDummy.reliabilty,
        });

        try {
            //Save populationCount and push its Object
            populationArr.push(await populationCount.save());

        } catch(err) {
            return await disconnectDB();
        }
    }

    return populationArr;
}

async function seedDataBase() {
    //Start DataBase
    await startDB();

    //Get data from external api
    let data = await getData();

    //Iterate over citites
    for (let i = 0 ; i < data.length; i++) {
        let cityName = data[i].city;
        let countryName = data[i].country;

        let city = new City();

        let populationCountsArr = await createPopulationCountsArray(i,data);

        city.name = cityName;
        city.countryName = countryName;
        city.populationCounts = populationCountsArr;

        let country = await Country.findOne({name : countryName});

        let dummyCity = await city.save();

        //Check for existing country
        if(country) {
            country.cities.push(dummyCity._id);

            let dummyCountry = await country.save();

            let calledCity = await City.find({_id : dummyCity._id});
            
            calledCity = dummyCountry._id;
        } else {
            let dummyCountry = createCountry(countryName,dummyCity._id);

            let calledCity = await City.find({_id : dummyCity._id});

            calledCity.countryId = dummyCountry._id;
        } 
    }
    //Dsiconnects mongo 
   await disconnectDB();
}