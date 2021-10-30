const { Sequelize } = require('sequelize');

// FORMAT 1: const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
module.exports = new Sequelize('postgres://lauren_eng:xTg9BV@localhost:5432/database_1882') 


// FORMAT 2 - passing parameters separately with postgres dialect
// module.exports = new Sequelize('database_1882', 'lauren_eng', 'xTg9BV', {
//         host: 'localhost',
//         dialect: 'postgres'
// }); 