module.exports = function(app) {

    const recipe = require('../controller/opinion.controller.js');

    // Create a new Recipe
    app.post('/api/opinion', opinion.create);

    // Retrieve all Recipe
    app.get('/api/opinions', opinion.findAll);

    // Retrieve a single Recipe by Id
    app.get('/api/opinion/:opinionId', opinion.findById);

    // Retrieve a single Recipe by userId
    app.get('/api/opinionByUser/:userId', opinion.findById);

    // Update a Recipe with Id
    app.put('/api/opinion/:opinionId', opinion.update);

    // Delete a Recipe with Id
    app.delete('/api/opinion/:opinionId', opinion.delete);
};