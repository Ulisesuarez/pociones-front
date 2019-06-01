module.exports = (sequelize, Sequelize) => {
    const recipeUser = sequelize.define('recipeUser', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
        },
        recipeId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
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
        timestamps: false,
    });



    return recipeUser;
};