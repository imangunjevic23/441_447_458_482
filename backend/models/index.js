const sequelize = require('../database');
const Agency = require('./agency');
const Trip = require('./trip');
const Traveler = require('./traveler');

Agency.hasMany(Trip, { foreignKey: 'agencyId', as: 'trips' });
Trip.belongsTo(Agency, { foreignKey: 'agencyId', as: 'agency' });

Trip.hasMany(Traveler, { foreignKey: 'tripId', as: 'travelers' });
Traveler.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

module.exports = {
    sequelize,
    Agency,
    Trip,
    Traveler
};