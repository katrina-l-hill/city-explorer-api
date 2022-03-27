'use strict';

const axios = require('axios');

let cache = require('./cache.js');

async function getWeather(request, response) {
  try {
    // create a key for what the user has searched for
    const key = 'weather-' + cityQuery;

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
      // use the cache
      console.log('Cache hit');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss');
      // make a new API request
      const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
      let apiForecasts = await axios.get(url);
      let forecastArray = apiForecasts.data.data.map(weather => new Forecast(dataItem.valid_date, dataItem.weather.description));
      cache[key] = { 
        data: forecastArray,
        timestamp: Date.now()
      }
      response.status(200).send(forecastArray);
      response.send(forecastArray);
    }
    return Promise.resolve(weatherSummaries);
  } catch (error) {
    return Promise.reject(error);
  }
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(dataItem => {
      return new Weather(dataItem.valid_date, dataItem.weather.description);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

module.exports = getWeather;