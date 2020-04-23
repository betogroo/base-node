'use strict';
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
    [
      {
        id: randomID({length: 7, type: 'url-safe'}),
        name: 'JOÃO ALVES DA SILVA',
        rg: "11111111",
        password: bcrypt.hashSync('11111111', 10),
        email: 'joaodasilva@gmail.com',
        idRole: 100
      },
      {
        id: randomID({length: 7, type: 'url-safe'}),
        name: 'MARIA ALVES DA SILVA',
        rg: "22222222",
        password: bcrypt.hashSync('22222222', 10),
        email: 'mariadasilva@gmail.com',
        idRole: 10
      },
      {
        id: randomID({length: 7, type: 'url-safe'}),
        name: 'PEDRO NUNES ROCHA',
        rg: "33333333",
        password: bcrypt.hashSync('33333333', 10),
        email: 'pedronunes@gmail.com',
        idRole: 10
      },
      {
        id: randomID({length: 7, type: 'url-safe'}),
        name: 'TORQUATO CALEIRO',
        rg: "44444444",
        password: bcrypt.hashSync('44444444', 10),
        email: 'eetc@gmail.com',
        idRole: 50
      },
      {
        id: randomID({length: 7, type: 'url-safe'}),
        name: 'DANTE GUEDINNI',
        rg: "55555555",
        password: bcrypt.hashSync('55555555', 10),
        email: 'jdanteguedini@gmail.com',
        idRole: 10
      },
      
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
