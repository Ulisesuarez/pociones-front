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
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'created_at',
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updated_at',
		},
	}, {
		freezeTableName: true,
	});

	return RecipeIngredient;
};