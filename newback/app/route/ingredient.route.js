module.exports = function(app) {

    const ingredient = require('../controller/ingredient.controller.js');
    // Retrieve all Ingredients
    app.get('/api/ingredients', ingredient.getAll);

};