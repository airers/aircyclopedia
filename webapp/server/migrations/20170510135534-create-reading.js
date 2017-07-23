'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Readings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Devices',
          key: 'id',
          as: 'deviceId',
        },
      },
      deviceTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pm25: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      microclimate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      locationLat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      locationLon: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      locationAcc: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      locationEle: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    return queryInterface.dropTable('Readings');
  }
};
