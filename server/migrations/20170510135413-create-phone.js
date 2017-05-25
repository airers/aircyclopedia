'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneUuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneInfo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastSeen: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Phones');
  }
};
