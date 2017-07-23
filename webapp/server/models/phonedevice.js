'use strict';
module.exports = function(sequelize, DataTypes) {
  var PhoneDevice = sequelize.define('PhoneDevice', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return PhoneDevice;
};
