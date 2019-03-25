const db = require('../config/db.config.js');
const User = db.users;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret= '$2a$10$PHPA5OpVKgjPHPEZzmy6UNsqzkjuG2xGET1wp3bPHP9ET5dzphptHQ3eRvyXSSO';
// Post a User
exports.create = (req, res) => {
	let hashedPass;
	bcrypt.hash(req.body.password, saltRounds)    // Store hash in your password DB.
	.then(function(hash){
		User.create({  
		username: req.body.username,
		password: hash,
		email: req.body.email,
		role: req.body.role,
		avatar: "https://api.adorable.io/avatars/204/abott@adorable.png"
	}).then(user => {		
		// Send created customer to client FALTA AÑADIR AVATAR
		res.send(user);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
	// Save to PostgreSQL database
	console.log(hashedPass);
	;
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	User.findAll().then(users => {
		// Send all customers to Client
		res.send(users);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};
 
// Find a Customer by Id
exports.findById = (req, res) => {	
	User.findById(req.params.userId).then(user => {
		res.send(user);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// Find Customers by Name
exports.findByUserName = (req, res) => {
	User.findAll({
		where: {
			userName: req.params.username
		}
	}).then(
		users => {
			res.send(users);
		}
	).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};
 
// Update a User
exports.update = (req, res) => {
	var user = req.body;
	const id = req.params.customerId;
	let hashedPass;
	let dateNow;
	if (req.body.deactivate){
		dateNow = Date.now();
	}
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
		hashedPass = hash;
		// Store hash in your password DB.
	});
	Customer.update( { 
		username: req.body.userName, 
		email: req.body.userMail,
		password: hashedPass,
		avatar: req.body.userAvatar,
		deactivated_at:dateNow
		},
						{ where: {id: req.params.userId} }
				   ).then(() => {
						res.status(200).send(customer);
				   }).catch(err => {
						res.status(500).send("Error -> " + err);
				   });
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
		res.status(200).send('User has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

exports.login = (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	User.findAll({
		where: {
			email: req.body.email
		}
	}).then(
		users => {
			console.log(users[0]);
			bcrypt.compare(password, users[0].password).then(function(match) {
				if (match) {
					var tokenData = {
						email: email,
						role: users[0].role,
						id: users[0].id
					  };
					var token = jwt.sign(tokenData, secret, {
						 expiresIn: 60 * 60 * 3 // expires in 3 hours
					  });
					  res.send({
						token: token,
						account: users[0],
					  });
				} else{
					res.status(401).send({
						  error: 'invalid credentials'
						});
					  }
				}).catch(err=>{
					res.status(500).send("User not found 1 -> " + err);
				});
			}).catch(err => {
		res.status(500).send("User not found 2 -> " + err);
	});
};

exports.accountByToken = (req, res) => {
    let token = req.headers['authorization'];
    if(!token){
        res.status(401).send({
          error: "You are not logged in"
        });
        return;
    }
 
    token = token.replace('Bearer ', '');
 
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        });
      } else {
		User.findById(decoded.id).then(user => {
			res.send(user);
		}).catch(err => {
			res.status(500).send("Error -> " + err);
		});
      }
    });
};