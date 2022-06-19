const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name : {
        type:String,
    },
    cities : [{
        type : mongoose.Types.ObjectId,
        ref : 'City'
    }]
});

const Country = mongoose.model('Country',countrySchema);

module.exports = {
    Country
}