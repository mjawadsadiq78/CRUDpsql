module.exports = app => {
    const user = require("../controllers/usercontroller.js");

    let router = require("express").Router();

    // Create new User
    router.post("/", user.createuser);

    // Retrieve all Users
    router.get("/", user.findAllUsers);

    // Retrieve all user emails
    router.get("/email", user.findAllEmails);

    // Retrieve a single Tutorial with id
    router.get("/:id", user.findOneUser);

    // Update a Tutorial with id
    router.put("/:id", user.updateUser);

    // Delete a Tutorial with id
    router.delete("/:id", user.deleteUser);

    // Create a new Tutorial
    router.delete("/", user.deleteAllUsers);

    app.use('/api/user', router);
};