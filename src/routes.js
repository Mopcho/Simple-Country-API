const { countryController } = require('./controllers/countryController');
//Requiring models here because of error with trying to access an undefinded Schema
const {PopulationCount} = require('./models/PopulationCount');
const {City} = require('./models/City');
const {Country} = require('./models/Country');
const { cityController } = require('./controllers/citiesController');
const { pagination } = require('./middlewares/paginationMiddleware');

const router = require('express').Router();

router.use('/countries',pagination,countryController);
router.use('/cities',pagination,cityController);

module.exports = {
    router
}