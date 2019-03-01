const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/user.model.js')(sequelize, Sequelize);
db.recipe = require('../model/recipe.model.js')(sequelize, Sequelize);
db.ingredient = require('../model/ingredient.model.js')(sequelize, Sequelize);
db.recipIngredient = require('../model/recipe.ingredient.model.js')(sequelize, Sequelize);
db.ingredient.belongsToMany(db.recipe, { through: db.recipIngredient } );
db.recipe.belongsToMany(db.ingredient, { through: db.recipIngredient });

module.exports = db;