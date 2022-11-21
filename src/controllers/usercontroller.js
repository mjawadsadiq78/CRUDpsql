const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const {getPagination, getPagingData} = require("../utils/pagination");
// Create and Save a new User
exports.createuser = (req, res) => {
    // Validate request
    if (!(req.body.first_name && req.body.email)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        username: req.body.username,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        status_id: req.body.status_id
        /*? req.body.phoneNo : false*/
    };
    console.log(user);

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the user!."
            });
        });
};



// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {

    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({
        limit,
        offset,
        attributes:{ exclude: ['createdAt', 'updatedAt', 'deletedAt']} })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving all users."
            });
        });
};

// Find a single user with an id
exports.findOneUser = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by using the id in request
exports.updateUser = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a user with its id in the request
exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. or User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "User not deleted with id=" + id
            });
        });
};

// Delete all users from the database.
exports.deleteAllUsers = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} User were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};

// Find all user emails

exports.findAllEmails = (req, res) => {

User.findAll({
    attributes:['email']
})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving emails."
        });
    });
};