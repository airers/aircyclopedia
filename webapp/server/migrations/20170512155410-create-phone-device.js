'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PhoneDevices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phoneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('PhoneDevices');
  }
};
