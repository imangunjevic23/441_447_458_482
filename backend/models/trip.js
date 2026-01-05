const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true // ISPRAVLJENO: bilo je primary_key
    },
    destination: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL },
    image_url: { type: DataTypes.TEXT },
    agencyId: {
        type: DataTypes.INTEGER, // U SQL-u je INTEGER SERIAL
        field: 'agencyId' // Povezuje se sa "agencyId" u bazi
    }
}, { tableName: 'trips', timestamps: false });

module.exports = Trip;