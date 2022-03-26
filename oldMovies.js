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
        response.send(movieArray);
    } catch (error) {
        next(error);
    };
};
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

module.exports = getMovie;