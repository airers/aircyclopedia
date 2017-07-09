'use strict';
module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define('Device', {
    serverDeviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sensorUuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
    },
    lastReading: {
      type: DataTypes.DATE
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Device.belongsToMany(models.Phone, {
            through: 'PhoneDevice',
            as: 'phones',
            foreignKey: 'deviceId'
        });
        Device.hasMany(models.Reading, {
            as: 'readings',
            foreignKey: 'deviceId'
        });
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['serverDeviceId']
      }
    ]
  });
  return Device;
};
