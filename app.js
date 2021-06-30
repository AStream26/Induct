const express = require('express');
const morgan = require('morgan');

const tourrouter = require('./Routes/tourRoute');
const app = express();
app.use(express.static(`${__dirname}/public`));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //for post request to get data

app.use('/panel', tourrouter);

app.all('*', (req, res, next) => {
  res.redirect('/panel');
});

module.exports = app;
