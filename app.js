// MongoDB & Node.js Sample API

/* ====================================== */
// Express Configuration
/* ====================================== */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));

// support parsing of application/json type post data
app.use(bodyParser.json());

/* ====================================== */
// Routing information
/* ====================================== */

const deliRoutes = require('./api/routes/delis');

app.use('/', deliRoutes);

app.use((request, response, next) => {
    response.status(200).json({
        message: "You're becoming a hero!"
    });
});

// app separated for intergation testing and separate seeding
module.exports = app;
