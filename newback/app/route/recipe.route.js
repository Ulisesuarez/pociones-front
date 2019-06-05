module.exports = function(app) {
 
    const recipe = require('../controller/recipe.controller.js');
 
    // Create a new Recipe
    app.post('/api/recipe', recipe.create);
 
    // Retrieve all Recipe
    app.post('/api/recipes', recipe.findAll);

    // Get all Recipe
    app.get('/api/recipes', recipe.findAll);

    // get Created recipes
    app.get('/api/recipe/created', recipe.getCreatedRecipes);
 
    // Retrieve a single Recipe by Id
    app.get('/api/recipe/:recipeId', recipe.findById);
	
	// Retrieve Recipes Age
    app.get('/api/recipe/tag/:tag', recipe.findByTag);
 
    // Update a Recipe with Id
    app.put('/api/recipe/:recipeId', recipe.update);
 
    // Delete a Recipe with Id
    app.delete('/api/recipe/:recipeId', recipe.delete);
    
    app.post('/api/recipes/search', recipe.findByIngredient);

};