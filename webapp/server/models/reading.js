'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reading = sequelize.define('Reading', {
    deviceTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pm25: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    microclimate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    locationLat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationLon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationAcc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationEle: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Reading.belongsTo(models.Device, {
          foreignKey: 'deviceId',
        });
      }
    }
  });
  return Reading;
};
