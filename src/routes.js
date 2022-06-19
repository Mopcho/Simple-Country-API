const { countryController } = require('./controllers/countryController');
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

// api/countries - done
// api/countries?sort=asc - done
// api/countries?sort=desc - done
// api/countries/(countryName) | Or contains - done

// api/cities/:countryName?sortName=asc&sortPop=desc
// api/cities/:countryName/:cityName