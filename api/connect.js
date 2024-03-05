// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('db_workshop_pos', 'postgres', '1234', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false,
//     port: 5432
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jfcnon', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3306
});

module.exports = sequelize;