'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING
      })
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('Users', 'password');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
