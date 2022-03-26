'use strict';

let cache = require('./cache.js');
// const axios = require('axios');


function getMovie(latitude, longitude) {
  const key = 'movies-' + city_name;
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
    const movieSummaries = movieData.data.map(day => {
      return new Movie(day);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(day) {
    this.movie = day.movie.description;
    this.time = day.datetime;
  }
}

module.exports = getMovie;
