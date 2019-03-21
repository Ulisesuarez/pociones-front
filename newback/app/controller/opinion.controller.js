const db = require('../config/db.config.js');
const Opinion = db.opinion;

// Post a Opinion
exports.create = (req, res) => {
    // Save to PostgreSQL database
    Opinion.create({
        id_user: req.body.name,
        id_recipe: req.body.steps,
        opinion: req.body.image,
    }).then(opinion => {
        opinion.catch(error=>{
            console.log(error);
        });
        // Send created Recipe to client
        res.send(opinion);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Error -> " + err);
    });
};

// FETCH all Opinions
exports.getAll = (req, res) => {
    Opinion.findAll().then(opinions => {
        // Send all Recipes to Client
        res.send(opinions);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Find a Opinion by Id
exports.findById = (req, res) => {
    Opinion.findByPk(req.params.id_opinion).then(opinion => {
        res.send(opinion);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Find Opinions by User
exports.findByUser = (req, res) => {
    Opinion.findAll({
        where: {
            id_user: req.params.id_user
        }
    }).then(
        opinions => {
            res.send(opinions);
        }
    ).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// findByRecipe

exports.findByRecipe = (req, res) => {
    Opinion.findAll({
        where: {
            id_recipe: req.params.id_recipe
        }
    }).then(
        opinions => {
            res.send(opinions);
        }
    ).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Update a Opinion
exports.update = (req, res) => {
    var Opinion = req.body;
    const id = req.params.id_opinion;
    Opinion.update({
        id_user: req.body.name,
        id_recipe: req.body.steps,
        opinion: req.body.image,
    }, {
        where: {
            id_opinion: id
        },
        returning: true
    }).then(opinion => {
        res.status(200).send(opinion);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Delete a Opinion by Id
exports.delete = (req, res) => {
    const id = req.params.id_opinion;
    Opinion.destroy({
        where: {
            id_opinion: id
        }
    }).then(() => {
        res.status(200).send('Opinion has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};