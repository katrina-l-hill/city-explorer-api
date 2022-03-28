'use strict';

//import modules/data
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

//configure server
const app = express();
app.use(cors({
  origin: '*'
}));
app.get('/weather', weatherHandler);
app.get('/movies', moviesHandler);

//end point handlers
function weatherHandler(request, response) {
  console.log(request.query);
    const { lat, lon } = request.query;
    getWeather(lat, lon)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}
function moviesHandler(request, response) {
  console.log(request.query);
  const { city_name } = request.query;
    getMovies(city_name)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
