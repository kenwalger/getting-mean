const Deli = require('../models/model.js');

// Create and Save a new deli
exports.create = (request, response) => {
    if(!request.body) {
        return response.status(400).send({
            message: "Hmmm, trying to save an empty deli isn't very heroic."
        });
    }

    // Create a new Deli
    // IDEA: Opportunity for a `getDeliFromRequestBody()` function?
    const deli = new Deli({
        name: request.body.name || 'Mystery Deli',
        rest_id: request.body.rest_id,
        street: request.body.street,
        district: request.body.district,
        city: request.body.city,
        state: request.body.state,
        postal_code: request.body.postal_code,
        specialty: request.body.specialty
    });

    // Save deli
    deli.save().then(data => {
        response.send(data);
    }).catch(err => {
        response.status(500).send({
            message: err.message || 'An error occurred while creating the deli.'
        });
    });
};

// Get all delis
exports.findAll = (request, response) => {
    Deli.find()
        .then(delis => {
            response.send(delis);
        }).catch(err => {
            response.status(500).send({
                message: err.message || 'Something happened while trying to get all the delis.'
            });
    });
};

// Find a single deli based on deliId
exports.findOne = (request, response) => {
    console.log(request.params.rest_id);
    Deli.find({rest_id: request.params.rest_id})
        .then(deli => {
            if(!deli) {
                // IDEA: This code is repeated in a number of places. Maybe create a `getNotFoundResponse()` or `notFound()` function?
                return response.status(404).send({
                    message: `Deli not found with id ${request.params.rest_id}`
                });
            }
            response.send(deli);
        }).catch(err => {
            if(err.kind === 'rest_id') {
                return response.send(404).send({
                    message: `Deli not found with id ${request.params.rest_id}`
                });
            }
            return response.status(500).send({
                message: `Sorry, something happened while trying to get the deli with id ${request.params.rest_id}`
            });
    });
};

// Update deli
exports.update = (request, response) => {
    if (!request.body) {
        return response.status(400).send({
            message: "Hmmm, trying to save an empty deli isn't very heroic."
        });
    }
    Deli.findOneAndUpdate({rest_id: request.params.rest_id},
    // IDEA: Opportunity for a `getDeliFromRequestBody()` function?
    {
        name: request.body.name || 'Mystery Deli',
        rest_id: request.body.rest_id,
        street: request.body.street,
        district: request.body.district,
        city: request.body.city,
        state: request.body.state,
        postal_code: request.body.postal_code,
        specialty: request.body.specialty
    }, {new: true})
        .then(deli => {
            if (!deli) {
                return response.status(404).send({
                    message: `Deli not found with id ${request.params.rest_id}`
                });
            }
            response.send(deli);
        }).catch(err => {
        if (err.kind === 'rest_id') {
            return response.send(404).send({
                message: `Deli not found with id ${request.params.rest_id}`
            });
        }
        return response.status(500).send({
            message: `Sorry, something happened while trying to get the deli with id ${request.params.rest_id}`
        });
    });
};

// Delete
exports.delete = (request, response) => {
    Deli.findOneAndDelete({rest_id: request.params.rest_id})
        .then(deli => {
            if (!deli) {
                return response.status(404).send({
                    message: `Deli not found with id ${request.params.rest_id}`
                });
            }
            response.send({message: 'Deli successfully deleted!'});
        }).catch(err => {
            if(err.kind === 'rest_id' || err.name === 'NotFound') {
                return response.status(404).send({
                    message: `Deli not found with id ${request.params.rest_id}`
                });
            }
            return response.status(500).sent({
                message: `Sorry, couldn't delete deli with id ${request.params.rest_id}`
            });
    });
};