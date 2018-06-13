// MongoDB & Node.js Sample API

/* ====================================== */
// Express Configuration
/* ====================================== */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));

// support parsing of application/json type post data
app.use(bodyParser.json());

/* ====================================== */
// Routing information
/* ====================================== */


const db = require('./api/data/db');
const data = require('./api/data/delis');

db.connect().then(function(db){
    db.collection('delis')
        .insertMany([
            data.margon,
            data.juniors,
            data.melt_shop,
            data.piccolo,
            data.toasties
        ], 
        function (err, r) {
            console.log("Database setup with five delis.");

            const deliRoutes = require('./api/routes/delis');

            app.use('/', deliRoutes);

            app.use((request, response, next) => {
                response.status(200).json({
                    message: "You're becoming a hero!"
                });
            });

            // Start the web server
            app.listen(port, () => {
                console.log('Express.js server is listening on Port %s.', port);
            });
        });
});

