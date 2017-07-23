'use strict';
module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define('Phone', {
    phoneUuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Phone.belongsToMany(models.Device, {
          through: 'PhoneDevice',
          as: 'devices',
          foreignKey: 'phoneId'
        });
      }
    }
  });
  return Phone;
};
