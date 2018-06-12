const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Database setup
const dbName = 'mdbw18';
const mdbPort = 27017;
const url = 'mongodb://localhost:' + mdbPort + '/'+ dbName;

mongoose.Promise = global.Promise;

mongoose.connect(url).then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log("Couldn't connect to the database. Exiting now...");
    process.exit();
});


// Define Routes
app.get('/', (request, response) => {
    response.json({"message": "Welcome to the Mongoose API."})
});


require('./routes/routes.js')(app);

// Listen for server requests
app.listen(3000, () => {
    console.log("Express server is listening on Port 3000.")
});
