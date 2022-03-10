const express = require('express');
const morgan = require('morgan');
const sequelize = require('./utils/database');
const fetcher = require('./utils/fetcher');

const app = express();

//* IMPORTING ENVIRONMENT VARIABLES
require('dotenv/config');
const port = process.env.PORT || 5000;
const api = process.env.API_URL;

//? MIDDLEWARE

//* BODY PARSING INTO JSON
app.use(express.json());

//* HTTP loggers details
//? development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//? ROUTES HANDLING
const reportRoute = require('./routes/reportRoute');

app.use(`${api}/report`, reportRoute);

//! ERROR HANDLING
app.use('*', (res, req, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//* DATABASE CONNECTION
sequelize.sync({ force: true }).then(() => console.log('Database is ready!'));
fetcher();

//* SERVER
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
