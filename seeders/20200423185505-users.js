'use strict';
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await     queryInterface.bulkInsert('Users',
      [
        {
          id: 'superADM',
          name: 'LUIZ HUMBERTO GARCIA',
          rg: "33014444",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('33014', 10),
          email: 'luizhumberto@gmail.com',
          birthDate: '1979-05-13',
          gender: 'M',
          idRole: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'JOANA ALVES DA SILVA',
          rg: "11111111",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('11111111', 10),
          email: 'joaodasilva@gmail.com',
          birthDate: '1969-12-12',
          gender: 'F',
          idRole: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'MARIA ALVES DA SILVA',
          rg: "22222222",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('22222222', 10),
          email: 'mariadasilva@gmail.com',
          birthDate: '1987-06-11',
          gender: 'F',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'PEDRO NUNES ROCHA',
          rg: "33333333",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('33333333', 10),
          email: 'pedronunes@gmail.com',
          birthDate: '1937-01-14',
          gender: 'M',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'TORQUATA CALEIRA',
          rg: "44444444",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('44444444', 10),
          email: 'eetc@gmail.com',
          birthDate: '1940-02-03',
          gender: 'F',
          idRole: 50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'DANTE GUEDINNI',
          rg: "55555555",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('55555555', 10),
          email: 'jdanteguedini@gmail.com',
          birthDate: '1997-06-12',
          gender: 'M',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'MARIA DELIA',
          rg: "66666666",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('66666666', 10),
          email: 'mariodelia@gmail.com',
          birthDate: '1998-05-07',
          gender: 'F',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'SYLVIO TORQUATO JUNQUEIRA',
          rg: "77777777",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('77777777', 10),
          email: 'jsylvio@gmail.com',
          birthDate: '1985-02-14',
          gender: 'M',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'DAVIDIA CARNEIRO EWBANK',
          rg: "88888888",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('88888888', 10),
          email: 'carneiro@gmail.com',
          birthDate: '1980-04-01',
          gender: 'F',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'ANA MARIA SOLA TELINI',
          rg: "99999999",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('99999999', 10),
          email: 'sola@gmail.com',
          birthDate: '1989-07-20',
          gender: 'F',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'OSWALDO CRUZ',
          rg: "10101010",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('10101010', 10),
          email: 'coc@gmail.com',
          birthDate: '1963-07-20',
          gender: 'M',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'PAULO EUGÊNIO',
          rg: "10111222",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('10111222', 10),
          email: 'pizzadejilo@gmail.com',
          birthDate: '1962-05-01',
          gender: 'M',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: randomID({ length: 8, type: 'url-safe' }),
          name: 'GENOVEVA NELISA OW',
          rg: "20111222",
          cpf: cpf.generate(),
          password: bcrypt.hashSync('20111222', 10),
          email: 'genelisa@gmail.com',
          birthDate: '1996-07-31',
          gender: 'F',
          idRole: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
,
      ], {})
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Users', null, {})
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
};
