const express = require('express');
const router = express.Router();

/* ====================================== */
// MongoDB Configuration
/* ====================================== */
let MongoClient = require('mongodb').MongoClient;
let co = require('co');
let assert = require('assert');

const dbName = 'mdbw18';
const mdbPort = 27017;
const url = 'mongodb://localhost:' + mdbPort + '/'+ dbName;

co(function*() {
    let db = yield MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        console.log("Successfully connected to MongoDB Database.");
        let db = client.db(dbName);
        let delis = db.collection('delis');

    /* ====================================== */
    // Route Definitions
    /* ====================================== */

        router.get('/', (request, response, next) => {
            console.log("You made it to the router. Nice work!");
            response.send("API index");
        });

        router.get('/delis', (request, response, next) => {
            console.log("You're on the quest for heros.");

            delis.find().toArray(function(err, results) {
                response.send(results);
            });
        });

        router.post('/delis/', (request, response) => {
            delis.insertOne(request.body, (err, result) => {
                if (err) return console.log(err)
                response.send("Here's the data that was saved: " + JSON.stringify(request.body));
            });
        });

        }
    ).catch(function (err) {
        console.log(err.stack);
        process.exit(1);
    });
});

// Export Router for use in app.js
module.exports = router;