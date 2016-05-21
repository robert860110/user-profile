//Including dependency
var Sequelize = require("sequelize");

var env = process.env.NODE_ENV || 'development';

var sequelize;

if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    });
} else {
    sequelize = new Sequelize('connect', 'root', 'password', {
        host: "localhost",
        port: 3306,
        dialect: 'mysql'
    });
}


//Setting up the config



var db = {};

db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
