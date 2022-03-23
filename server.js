'use strict'

console.log('my first server');
// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for the server.

const express = require('express');

// USE
// Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step wtih "import." Node/Express takes 2 steps; 'require' and 'use'.

// Instantiate express. Create an instance of express called 'app'.
const app = express();

// ROUTES
// We will write our endpoints here.


// ERRORS
// Handle errors

// LISTEN
// Start the server