'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Roles', 
      [
        {
          name: 'Usuário',
          id: 10
        },
        {
          name: 'Moderador',
          id: 50
        },
        {
          name: 'Super Admin',
          id: 100
        }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Roles', null, {});
  
  }
};
