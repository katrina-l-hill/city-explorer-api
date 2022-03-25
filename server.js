'use strict'

console.log('my first server');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for the server.
const express = require('express');
const axios = require('axios');
require('dotenv').config();
// const weather = require('./Weather');
// const movie = require('./movie');
let data = require('./data/weather.json');


// we must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step wtih "import." Node/Express takes 2 steps; 'require' and 'use'.

// Instantiate express. Create an instance of express called 'app'.
const app = express();

// use cors

app.use(cors());

// define PORT and validate that my .env file is working.
// Tell JS to use the port value in the .env file. If not, use 3002.
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know something is wrong with my .env file or how I'm importing the values from it.


// ROUTES
// We will write our endpoints here.
// app.get() correlates to axios.get
// It takes some parameter: ((callback)(function))
app.get('/', (request, response) => {
    // send response
    response.send('hello, from our server!');
});

app.get('/weather', async (request, response, next) => {
    try {
        let lat = request.query.lat;
        let lon = request.query.lon;
        let apiForecasts = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
        let forecastArray = [];
        apiForecasts.data.data.map((dataItem) => {
            forecastArray.push(new Forecast(dataItem.valid_date, dataItem.weather.description));
        });
        response.send(forecastArray);
    } catch (error) {
        next(error);
    }
});
app.get('/movies', async (request, response, next) => {
    try {
        let cityQuery = request.query.city_name;
        let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityQuery}`);
        let movieArray = [];
        movieResponse.data.results.map((movieItem) => {
            movieArray.push(new Movie(movieItem));
        });
        console.log(movieResponse.data.results[0]);
        response.send(movieArray);
    } catch (error) {
        next(error);
    }
});


app.get('*', (request, response) => {
    response.send('what you are looking for doesn\'t exist.');
});

// ERRORS
// Handle errors
app.use((error, request, response, next) => {
    response.status(500).send(error.message);
})

// CLASSES
class City {
    constructor(cityObject) {
        this.city_name = cityObject.city_name;
        this.data = cityObject.data;
        this.lon = cityObject.lon;
        this.lat = cityObject.lat;
        this.country_code = cityObject.country_code;
        this.state_code = cityObject.state_code;
        this.forecast = cityObject.forecastArray;
    }
}

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

class Movie {
    constructor(element) {
        this.adult = element.adult;
        this.backdrop_path = element.backdrop_path;
        this.genre_ids = element.genre_ids;
        this.original_language = element.original_language;
        this.orginal_title = element.orginal_title;
        this.overview = element.overview;
        this.popularity = element.popularity;
        this.poster_path = element.poster_path;
        this.release_date = element.release_date;
        this.title = element.title;
        this.video = element.video;
        this.vote_average = element.vote_average;
        this.vote_count = element.vote_count;
    }
}

// LISTEN
// Start the server

// Use the instance of Express we created
// Listen is an Express method that takes in a port value and a callback function.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));