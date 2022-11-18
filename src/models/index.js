const dbConfig = require("../config/dbconfig.js");
const db = {};

const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
    {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./usermodel")(sequelize, Sequelize);

module.exports = db;