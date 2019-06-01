const db = require('../config/db.config.js');
const Recipe = db.recipe;


// Post a Recipe
exports.create = (req, res) => {
	// Save to PostgreSQL database
	Recipe.create({
		name: req.body.name,
		steps: req.body.steps,
		image: req.body.image,
		tag: req.body.tag,
	}).then(recipe => {
		/*console.log(recipe);
		console.log(recipe._modelOptions);
		console.log(recipe._modelOptions.classMethods);
		console.log(recipe._modelOptions.classMethods.associate);
		console.info(recipe._modelOptions.classMethods.associate);
		console.log(recipe._modelOptions.classMethods.associate.toString());
		console.log(req.body.ingredients);*/
		recipe.setIngredients(req.body.ingredients).catch(error=>{
			console.log(error);
		});
		// Send created Recipe to client
		res.send(recipe);
	}).catch(err => {
		console.log(err);
		res.status(500).send("Error -> " + err);
	});
};

// FETCH all Recipes
exports.findAll = (req, res) => {
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
exports.findByTag = (req, res) => {
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


exports.findByIngredient = (req, res) => {
	let ingredients = "'{" + req.body.ingredients.join(',') + "}'"
	let category = '';
	if (req.category && rq.category !== 'Any') {
		category = "AND tag = '" + rq.body.category + "'";
	}
	sequelize.query("SELECT * FROM recipe WHERE id= ANY "+
	"(SELECT recipe_id FROM (SELECT recipe_id, array_agg(ingredient_id)" +
	" as ingredients FROM public.recipe_ingredient" +
	" GROUP BY recipe_id) tmp" + 
	"WHERE ingredients @> " + ingredients + ")" + category, { type: sequelize.QueryTypes.SELECT})
  .then(recipes => {
    res.status(200).send(recipes)
  }).catch(err => {
		res.status(500).send("Error -> " + err);
	})};

exports.getCreatedRecipes = (req, res) => {
	Recipe.findAll({
		where: {
			creator: req.params.creator
		}
	}).then(
		recipes => {
			res.send(recipes);
		}
	).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

