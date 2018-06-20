const db = require('./db.js');
const data = require('./delis.js');

db.connect().then(db => {
	db.collection('delis')
		// QUESTION: Did you intentionally not insert some of the delis that are defined in your data?
		.insertMany([
			data.margon,
			data.juniors,
			data.melt_shop,
			data.piccolo,
			data.toasties
		],
			(err, r) => {
				console.log('Database setup with delis.');
				process.exit(0);
			});
});