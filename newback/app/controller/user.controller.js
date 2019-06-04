const db = require('../config/db.config.js');
const User = db.users;
const recipeUser = db.recipeUser;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const crypto = require('crypto-promise')
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

/*  ///////////////////////////////////

// FETCH some Customers
exports.findLimit = (req)
User.findAll()({
	limit: 10
  });

 /////////////////////////////////// */


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

exports.getFavouriteRecipes =(req, res) => {
	recipeUser.findAll({
		where: {
			userId: req.params.userId

		}
	}).then(
		recipes => {
			res.send(recipes);
		}
	).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'potionsofthedrunkenwitch@gmail.com',
         pass: 'estoVieneHasheado'
     }
 });
exports.forgot = (req, res)=> {
	 var token
	crypto.randomBytes(20).then(response=>{
		token = response.toString('hex')	
		User.findOne({ where: {email: req.body.email} }).then(user => {
		if (!user) {
			res.status(403).send("Error -> No user match this email ");
		}
		db.sequelize.query("INSERT INTO public.session("+
			"user_id, token, expire_at, created_at, updated_at)"+
			"VALUES ("+user.id.toString()+", '"+token+"', CURRENT_TIMESTAMP + INTERVAL '6 hour' , CURRENT_TIMESTAMP, NULL); ", { type: db.sequelize.QueryTypes.INSERT})
			.then(response=>{
				const mailOptions = {
					from: 'potionsofthedrunkenwitch@gmail.com', // sender address
					to: req.body.email, // list of receivers
					subject: 'Potions forgoten password', // Subject line
					html:'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					' ' + req.headers.origin + '/reset/' + token + '/email/'+req.body.email+'\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'// plain text body
				};
				transporter.sendMail(mailOptions, function (err, info) {
					if(err)
						console.log(err)
					else
						res.status(200).send('Email sended');
						console.log(info);
			 });
			}).catch(err => {
				console.log(err)
				res.status(500).send("Error -> " + err);
			});
	})

	})
	
}
exports.reset= (req, res)=> {
	let expireAt;
	let userID;
	db.sequelize.query("SELECT user_id, expire_at 	FROM public.session "+
	"WHERE token = '"+req.body.token+"';", { type: db.sequelize.QueryTypes.SELECT})
			.then(response=>{
				userID=response[0].user_id;
				expireAt=response[0].expire_at;
				bcrypt.hash(req.body.password, saltRounds)    // Store hash in your password DB.
				.then(function(hash){
				if (new Date(expireAt) > new Date()){
					
						User.update(
							{password: hash},
							{where: {id: userID}}
						)
						.then(response => {
							res.status(200).send("Password updated")
						}).catch(err => {
							console.log(err)
							res.status(500).send("Error -> " + err);
						});
				} else {
					console.log("Expired token")
					res.status(500).send("Error -> expired token");
				}
			}).catch(err => {
				console.log(err)
				res.status(500).send("Error -> " + err);
			});
		})
		}
