module.exports = (sequelize, Sequelize) => {
	const RecipeIngredient = sequelize.define('recipe_ingredient', {
        ingredientId: {
			type: Sequelize.INTEGER,
			field: 'ingredient_id',
		},
		recipeId: {
			type: Sequelize.INTEGER,
			field: 'recipe_id',
		},
	}, {
		freezeTableName: true,
		timestamps: false,
	});

	return RecipeIngredient;
};