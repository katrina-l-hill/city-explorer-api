'use strict'

console.log('my first server');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for the server.
const express = require('express');
require('dotenv').config();
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

app.get('/sayHello', (request, response) => {
    let name = request.query.name;
    let lastName = request.query.lastName;
    response.send(`Hello ${name} ${lastName}`);
});

app.get('/weather', (request, response) => {
    try {
        let city_name = request.query.city_name;
        let cityObject = data.find(weather => weather.city_name.toLocaleLowerCase() === city_name.toLocaleLowerCase());
        let selectedCity = new City(cityObject);
        //map over selectedCity.data
            //create a Forecast object passing in the date and description of the data object

        response.send(selectedCity);
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
    }
}

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

// LISTEN
// Start the server

// Use the instance of Express we created
// Listen is an Express method that takes in a port value and a callback function.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));