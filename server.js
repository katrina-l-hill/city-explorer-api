'use strict'

console.log('my first server');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for the server.
let data = request('./data/weather.json');

const express = require('express');
require('dotenv').config();

// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step wtih "import." Node/Express takes 2 steps; 'require' and 'use'.

// Instantiate express. Create an instance of express called 'app'.
const app = express();

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
    let lastName = request.query.name;
    response.send(`Hello ${name} $lastName}`);
});

app.get('*', (request, response) => {
    response.send('what you are looking for doesn\'t exist.');
});

app.get('/weather', (request, response) => {
    try {
        let city_name = request.query.city_name;
        let cityObject = data.find(weather => weather.city_name === city_name);
        let selectedCity = new City(cityObject);
        response.send(selectedCity);
    } catch(error) {
        next(error);
    }
});

// ERRORS
// Handle errors

// CLASSES
class City {
    constructor(cityObject) {
        this.name = cityObject.name;
        this.city_name = cityObject.city_name;
    }
}

// LISTEN
// Start the server

// Use the instance of Express we created
// Listen is an Express method that takes in a port value and a callback function.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));