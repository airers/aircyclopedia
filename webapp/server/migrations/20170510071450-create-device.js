'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serverDeviceId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sensorUuid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastSeen: {
        type: Sequelize.DATE,
      },
      lastReading: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Devices');
  }
};
