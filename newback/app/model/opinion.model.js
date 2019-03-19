module.exports = (sequelize, Sequelize) => {
    const Opinion = sequelize.define('opinion', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        opinion: {
            type: Sequelize.STRING
        },
        recipeId: {
            type: Sequelize.INTEGER
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
        // classMethods: {
        //     associate: function (models) {
        //         Opinion.hasMany(models.Ingredient, {
        //             foreignKey: id
        //         });
        //     }
        // }
    });

    return Opinion;
};