const express = require("express");
const db = require("./src/models/index");
require("dotenv/config");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./src/routes/routes")(app);

db.sequelize.sync()
.then(() => {
        console.log("Synced db.");
    })
.catch((err) => {
        console.log("Failed to sync db: " + err.message);

    });

/*// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});*/

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});