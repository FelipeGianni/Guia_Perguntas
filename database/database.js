const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root','suporte',{
   host: 'localhost',
   dialect: 'mysql'
});

module.exports = connection;