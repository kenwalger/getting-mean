const express = require('express');
const router = express.Router();

const db = require('../data/db').db;
let delis = db.collection('delis');

/* ====================================== */
// Route Definitions
/* ====================================== */

// GET Routes
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

// POST Routes
router.post('/delis/', (request, response) => {
    delis.insertOne(request.body, (err, result) => {
        if (err) return console.log(err)
        response.send("Here's the data that was saved: " + JSON.stringify(request.body));
    });
});

// PUT routes

// DELETE routes

// Export Router for use in app.js
module.exports = router;