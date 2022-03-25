'use strict'

const axios = require('axios');

async function getMovie (request, response, next) {
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
    };
};

module.exports = movie;