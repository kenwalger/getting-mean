const mongoose = require('mongoose');

const deliSchema = mongoose.Schema({
    name: String,
    rest_id: Number,
    street: String,
    district: String,
    city: String,
    state: String,
    postal_code: Number,
    specialty: String

}, {collection: 'nyc_delis'});

module.exports = mongoose.model('Deli', deliSchema);