const db = require('../config/db.config.js');
const Opinion = db.opinion;

// Post a Recipe
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Opinion.create({
        name: req.body.name,
        steps: req.body.steps,
        image: req.body.image,
        tag: req.body.tag,
    }).then(opinion => {
        opinion.setIngredients(req.body.ingredients).catch(error=>{
            console.log(error);
        });
        // Send created Recipe to client
        res.send(opinion);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Error -> " + err);
    });
};

// FETCH all Recipes
exports.getAll = (req, res) => {
    Recipe.findAll({include:db.ingredient}).then(recipes => {
        // Send all Recipes to Client
        res.send(recipes);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

// Find a Recipe by Id
exports.findById = (req, res) => {
    Recipe.findByPk(req.params.recipeId,{include:db.ingredient}).then(recipe => {
        res.send(recipe);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Find Recipes by Tag
exports.findByUser = (req, res) => {
    Recipe.findAll({
        where: {
            tag: req.params.tag
        }
    }).then(
        recipes => {
            res.send(recipes);
        }
    ).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Update a Recipe
exports.update = (req, res) => {
    var Recipe = req.body;
    const id = req.params.recipeId;
    Recipe.update({
        name: req.body.name,
        steps: req.body.steps,
        image: req.body.image,
        tsg: req.body.tag,
    }, {
        where: {
            id: id
        },
        returning: true
    }).then(recipe => {
        recipe.setIngredients(req.body.ingredients);
        res.status(200).send(recipe);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Delete a Recipe by Id
exports.delete = (req, res) => {
    const id = req.params.recipeId;
    Recipe.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).send('Recipe has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};