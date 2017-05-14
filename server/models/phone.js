'use strict';
module.exports = function(sequelize, DataTypes) {
  var Phone = sequelize.define('Phone', {
    phoneInfo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: false,
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
