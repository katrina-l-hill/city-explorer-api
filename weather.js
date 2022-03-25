'use strict'

const axios = require('axios');

async function getWeather(request, response, next) {
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
};
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
module.exports = getWeather;