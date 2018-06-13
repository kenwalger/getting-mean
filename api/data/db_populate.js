let MongoClient = require('mongodb').MongoClient;
let co = require('co');  // For async processing
let assert = require('assert');
let data = require('../data/delis.js');

const dbName = 'mdbw18';
const mdbPort = 27017;
const url = 'mongodb://localhost:' + mdbPort + '/' + dbName;

co(function*() {
	let db = yield MongoClient.connect(url, function (err, client) {
		if (err) throw err;
		console.log("Successfully connected to MongoDB Server on Port %s.", mdbPort);
		let db = client.db(dbName);
		db.collection('delis').insertMany([
				data.margon,
				data.juniors,
				data.melt_shop,
				data.piccolo,
				data.toasties,],
			function (err, r) {
				assert.equal(null, err);
				assert.equal(5, r.insertedCount);
				console.log("Database setup with five delis.");
			});
	}).catch(function (err) {
		console.log(err.stack);
		process.exit(1);
	});
});