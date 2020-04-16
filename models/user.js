const bcrypt = require('bcryptjs')
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      set(value){
        this.setDataValue('name', value.toUpperCase())
      }
    },
    email: {
      type: DataTypes.STRING,
      set(value){
        this.setDataValue('email', value.toLowerCase())
      }
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10))
      }
    },
    idRole: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    this.belongsTo(models.Role, {
      foreignKey: 'idRole'
    })
  };
  return User;
};