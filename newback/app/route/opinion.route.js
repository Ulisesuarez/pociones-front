module.exports = function(app) {

    const opinion = require('../controller/opinion.controller.js');

    // Create a new Opinion
    app.post('/api/opinion/new', opinion.create);

    // Retrieve all Opinion
    app.get('/api/opinions', opinion.getAll);

    // Retrieve a single Recipe by Id
    app.get('/api/opinion/:opinionId', opinion.findById);

    // Retrieve a single Recipe by userId
    app.get('/api/opinionByUser/:userId', opinion.findById);

    // Retrieve all Opinions by ReceipId
    app.get('/api/opinions/:recipeId', opinion.findByRecipe);

    // Update a Recipe with Id
    app.put('/api/opinion/:opinionId', opinion.update);

    // Delete a Recipe with Id
    app.delete('/api/opinion/:opinionId', opinion.delete);
};