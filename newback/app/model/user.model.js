module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	  },
	  username: {
		  type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
	  email: {
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
		deactivated_at: {
			type: 'TIMESTAMP',

		},
		avatar:{
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		},
	});
	
	return User;
};