const db = require('../config/db.config.js');
const Ingredient = db.ingredient;


// FETCH all Ingredients
exports.getAll = (req, res) => {
    Ingredient.findAll().then(ingredients => {
        // Send all Recipes to Client
        res.send(ingredients);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};