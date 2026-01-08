const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Agency = sequelize.define('Agency', {
    id: {
        type: DataTypes.INTEGER, // U SQL-u je SERIAL, pa je ovdje INTEGER
        primaryKey: true,        // ISPRAVLJENO: bilo je primary_key
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'agencies', timestamps: false });

module.exports = Agency;