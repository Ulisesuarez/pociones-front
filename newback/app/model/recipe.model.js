module.exports = (sequelize, Sequelize) => {
	const Recipe = sequelize.define('recipe', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING
		},
		tag: {
			type: Sequelize.STRING
		},
		steps: {
			type: Sequelize.ARRAY(Sequelize.STRING)
		},
		image: {
			type: Sequelize.STRING
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
		creator: {
			type: Sequelize.INTEGER,
			foreignKey: true,
		},
	}, {
		freezeTableName: true,
		classMethods: {
			associate: function (models) {
				Recipe.belongsToMany(models.Ingredient, {
					foreignKey: id
				});
			}
		}
	});

	return Recipe;
};