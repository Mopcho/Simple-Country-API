const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name : {
        type:String
    },
    populationCounts : [{
        type :  mongoose.Types.ObjectId,
        ref : 'PopulationCount'
    }],
    countryId : {
        type :  mongoose.Types.ObjectId,
        ref : 'Country'
    },
    countryName : {
        type : String
    }
});

const City = mongoose.model('City',citySchema);

module.exports = {
    City
}