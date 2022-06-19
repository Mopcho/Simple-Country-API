const mongoose = require('mongoose');

const populationCountSchema = new mongoose.Schema({
    year : {
        type : Number,
    },
    value : {
        type : Number,
    },
    sex : {
        type : String,
    },
    reliabilty : {
        type : String,
    }
});

const PopulationCount = mongoose.model('PopulationCount',populationCountSchema);

module.exports = {
    PopulationCount
}