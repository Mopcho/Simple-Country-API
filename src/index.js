const express = require('express');
const { constants } = require('./configs/constants');
const {initializeDatabase}  = require('./configs/database');
const cors = require('cors');
const { router } = require('./routes');
const { glErrorHandler } = require('./middlewares/globalErrorHandler');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api',router);
app.use(glErrorHandler);

initializeDatabase().then(()=> {
    app.listen(constants.port,()=> console.log(`App listening on port ${constants.port}`));
}).catch((err)=> {
    console.log('Database connection error');
});