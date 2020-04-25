'use strict';
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'JOÃO ALVES DA SILVA',
          rg: "11111111",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('11111111', 10),
          email: 'joaodasilva@gmail.com',
          idRole: 100
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'MARIA ALVES DA SILVA',
          rg: "22222222",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('22222222', 10),
          email: 'mariadasilva@gmail.com',
          idRole: 10
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'PEDRO NUNES ROCHA',
          rg: "33333333",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('33333333', 10),
          email: 'pedronunes@gmail.com',
          idRole: 10
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'TORQUATO CALEIRO',
          rg: "44444444",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('44444444', 10),
          email: 'eetc@gmail.com',
          idRole: 50
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'DANTE GUEDINNI',
          rg: "55555555",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('55555555', 10),
          email: 'jdanteguedini@gmail.com',
          idRole: 10
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'MÁRIO DELIA',
          rg: "66666666",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('66666666', 10),
          email: 'mariodelia@gmail.com',
          idRole: 10
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'SYLVIO TORQUATO JUNQUEIRA',
          rg: "77777777",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('77777777', 10),
          email: 'jsylvio@gmail.com',
          idRole: 10
        },
        {
          id: randomID({ length: 7, type: 'url-safe' }),
          name: 'DAVID CARNEIRO EWBANK',
          rg: "88888888",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('88888888', 10),
          email: 'carneiro@gmail.com',
          idRole: 10
        },

      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
