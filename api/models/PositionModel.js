const conn = require('../connect');
const { DataTypes } = require('sequelize');
const PositionModel = conn.define('position', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }    
})

PositionModel.sync({ alter: true });

module.exports = PositionModel;