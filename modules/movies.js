'use strict';

let cache = require('./cache.js');
const axios = require('axios');

function getMovie(cityQuery) {
  const key = 'movies-' + cityQuery;
  const url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityQuery}`);

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovies(response.data));
  }
  
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
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

module.exports = getMovie;
