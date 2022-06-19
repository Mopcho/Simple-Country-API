const mongoose = require('mongoose');
const {City} = require('../models/City');
const {Country} = require('../models/Country');
const {PopulationCount} = require('../models/PopulationCount');
const fetch = require('cross-fetch');

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

(async () => {
    //Start DataBase
    await startDB();

    //Get data from external api
    let data = await getData();

    //Iterate over citites
    for (let i = 0 ; i < data.length; i++) {
        let city = new City();

        //Set the name of the city
        city.name = data[i].city;
        
        //Iterate over population counts
        for (let a = 0 ; a < data[i].populationCounts.length; a++) {
            //Create populationCountDummy ( Only for more readability )
            let popDummy = data[i].populationCounts[a];

            //Create new population count with parameters
            let populationCount = new PopulationCount({
                year : popDummy.year,
                value : popDummy.value,
                sex : popDummy.sex,
                reliabilty : popDummy.reliabilty,
            });

            try {
                //Save populationCount and get its Object
                let popObj = await populationCount.save();
    
                //Push population's _id to current city
                city.populationCounts.push(popObj._id);

            } catch(err) {
                return await disconnectDB();
            }
        }

        //Try to find a country with the same name if there is no city found this returns null
        let countryObj = await Country.findOne({name : data[i].country}).lean();

        //Save city and get its object
        let cityObj = await city.save();

        //Check if there is a country with that name already
        if(countryObj) {
            try {
                //Update the country
                let newCountry = await Country.findOne({_id : countryObj._id});

                newCountry.cities.push(cityObj._id);

                let countryDummy = await newCountry.save();

                let newCity = await City.findById(cityObj._id);

                newCity.countryId = countryObj._id;
                newCity.countryName = countryObj.name;

                await newCity.save();
            } catch(err) {
                return await disconnectDB();
            }
        } else {
            try {
                //Create a new country
                let country = new Country();

                //Set it's name
                country.name = data[i].country;
    
                //Push current city's _id
                country.cities.push(cityObj._id);

                //Save country to DB
                let countryObj = await country.save();

                //Get the newly saved city from the DB 
                let newCity = await City.findById(cityObj._id);

                //Ad relations to it
                newCity.countryId = countryObj._id;
                newCity.countryName = countryObj.name;

                //Save city
                await newCity.save();
            } catch(err) {
                return await disconnectDB();
            }
            
        }
            
    }
    //Dsiconnects mongo 
   await disconnectDB();
  })();
