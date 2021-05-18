const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL,{logging:false});

module.exports = sequelize;