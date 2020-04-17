'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Users', 'rg', {
        type: Sequelize.INTEGER
      })
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'rg');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
