'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    this.hasMany(models.User, {
      foreignKey: 'idRole'
    })
  };
  return Role;
};