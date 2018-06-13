
/* ====================================== */
// MongoDB Configuration
/* ====================================== */
let MongoClient = require('mongodb').MongoClient;
// let co = require('co');
// let assert = require('assert');
// let data = require('./delis');

const dbName = 'mdbw18';
const mdbPort = 27017;
const url = 'mongodb://localhost:' + mdbPort + '/'+ dbName;

class Connection {
    constructor(uri, name) {
        this.db = null;
        this.uri = uri;
        this.name = name;
    }

    connect() {
        if(this.db) {
            return Promise.resolve(this.db);
        } else {
            return MongoClient.connect(this.uri)
                .then(client => {
                    this.db = client.db(this.name);
                    return this.db;
                });
        }
    }
}

module.exports = new Connection(url, dbName);

// co(function*() {
//     let db = yield MongoClient.connect(url, function (err, client) {
//             if (err) throw err;
//             console.log("Successfully connected to MongoDB Database.");

//             
//         }
//     ).catch(function (err) {
//         console.log(err.stack);
//         process.exit(1);
//     });
// });