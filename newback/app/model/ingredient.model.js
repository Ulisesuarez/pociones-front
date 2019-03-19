module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define('ingredient', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
		}
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                Ingredient.belongsToMany(models.Recipe, {
                    foreignKey: id
                });
            }
        }
    });
    
    return Ingredient;
};