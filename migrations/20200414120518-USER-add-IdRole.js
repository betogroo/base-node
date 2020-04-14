'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn(
        'Users',
        'idRole',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 10,
          references: {
            model: 'Roles',
            key: 'id'
          }
        }
      )
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn(
        'Users',
        'idRole',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 10
        }
      )
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }
};
