module.exports = (app) => {
	const delis = require('../controllers/controller.js');

	// New Deli
	app.post('/delis', delis.create);

	// Get Delis
	app.get('/delis', delis.findAll);

	// Single deli with deliId
	app.get('/delis/:rest_id', delis.findOne);

	// Update a deli with deliId
	app.put('/delis/:rest_id', delis.update);

	// Delete a deli with deliId
	app.delete('/delis/:rest_id', delis.delete);
};