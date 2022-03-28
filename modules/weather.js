'use strict';

const axios = require('axios');

let cache = require('./cache.js');

async function getWeather(lat, lon) {
  try {
    // create a key for what the user has searched for
    const key = 'weather-' + lat + lon;

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
      // use the cache
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      // make a new API request
      const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
      let apiForecasts = await axios.get(url);
      let forecastArray = apiForecasts.data.data.map(dataItem => new Forecast(dataItem.valid_date, dataItem.weather.description));
      cache[key] = { 
        data: forecastArray,
        timestamp: Date.now()
      }
    }
    return Promise.resolve(cache[key].data);
  } catch (error) {
    return Promise.reject(error);
  }
}

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

module.exports = getWeather;