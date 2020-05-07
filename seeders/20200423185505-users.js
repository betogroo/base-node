'use strict';
const randomID = require('crypto-random-string')
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const { cpf } = require('cpf-cnpj-validator')
const moment = require('moment')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBirthDate(minYear, maxYear, minMonth, maxMonth, minDay, maxDay) {
  let year = getRandomInt(minYear, maxYear)
  let month = getRandomInt(minMonth, maxMonth)
  let day = getRandomInt(minDay, maxDay)
  return `${year}-${month}-${day}`
}



function getRandomRg() {
  return randomID({ length: 8, type: 'numeric' })
}


function getRandomGender() {
  const genders = ['M', 'F']
  const randomGender = genders[Math.floor(Math.random() * genders.length)]
  return randomGender
}

function getRandomPeople() {
      let names = [
        "Alicia", "Sesimbra",
        "Américo", "Alvim",
        "Antonieta", "Guedelha",
        "Araci",
        "Belmifer", "Peralta",
        "Bento", "Quinteiro",
        "Bernardina", "Paez",
        "Branca", "Figueira",
        "Brites", "Monsanto",
        "Carlota", "Vasques",
        "Catarina", "Sarabia",
        "Catarino", "Lagoa",
        "Celestino", "Fraga",
        "Cândido", "Figueroa",
        "Délio", "Leal",
        "Emanuel", "Estevez",
        "Emiliano", "Bandeira",
        "Emídio", "Sotomayor",
        "Eusébio", "Cyrne",
        "Ferdinando", "Mourinho",
        "Ferdinando", "Valgueiro",
        "Fábio", "Ataí",
        "Fábia", "Pedrozo",
        "Glauco", "Henriques",
        "Hernani", "Novais",
        "Ildefonso", "Lopez",
        "Iolanda", "Veloso",
        "Ismael", "Rebello",
        "Jonas", "Varela",
        "José", "Tigre",
        "Juliano", "Inácio",
        "Jéssica", "Brito",
        "Leonir", "Raminhos",
        "Lina", "Estévez",
        "Lopo", "Salgado",
        "Mara", "Salomão",
        "Moaci", "Granja",
        "Mónica", "Lima",
        "Nicanor", "Cotegipe",
        "Parcidio", "Vilanova",
        "Quitério", "Varejão",
        "Rufus", "Ipiranga",
        "Sebastião", "Juruna",
        "Teresa", "Saltão",
        "Tristão", "Garcez",
        "Tânia", "Passos",
        "Verônica", "Diónatas", "Uólisson", "Bentes",
        "Xénia", "Mourato",
        "Zoraide", "Borba",
        "Zuleide",
        "Pedro", "Luiz", "Luis",
        "Humberto", "Cesar",
        "Geórgia", "José",
        "Pascoal",
        "Viviane", "Aparecida",
        "Teolides",
        "Olavo", "Henrique",
        "Osvaldo", "Cirlene",
        "Bruno",
        "Bárbara", "Bianca",
        "João", "Paulo",
        "João Paulo",
        "Gustavo", "Caic",
        "Lucca", "Mara",
        "Helena",
        "Cláudia", "Celso",
        "Adriana", "Sebastião",
        "Vicente",
        "Cássio", "Carlos",
        "Marcelo",
        "Ferreira", "Rita",
        "Paula", "Edilaine",
        "Miguel", "Sophia",
        "Davi", "Alice",
        "Arthur", "Julia",
        "Pedro", "Isabella",
        "Gabriel", "Manuela",
        "Bernardo", "Laura",
        "Lucas", "Luiza",
        "Matheus", "Valentina",
        "Rafael", "Giovanna",
        "Heitor", "Maria Eduarda",
        "Enzo", "Helena",
        "Guilherme", "Beatriz",
        "Nicolas", "Maria Luiza",
        "Lorenzo", "Lara",
        "Gustavo", "Mariana",
        "Felipe", "Nicole",
        "Samuel", "Rafaela",
        "João Pedro", "Heloísa",
        "Daniel", "Isadora",
        "Vitor", "Lívia",
        "Leonardo", "Maria Clara",
        "Henrique", "Ana Clara",
        "Theo", "Lorena",
        "Murilo", "Gabriela",
        "Eduardo", "Yasmin",
        "Pedro Henrique", "Isabelly",
        "Pietro", "Sarah",
        "Cauã", "Ana Julia",
        "Isaac", "Letícia",
        "Caio", "Ana Luiza",
        "Vinicius", "Melissa",
        "Benjamin", "Marina",
        "Clara",
        "Cecília",
        "João Miguel", "Esther",
        "Bryan", "Emanuelly",
        "Joaquim", "Rebeca",
        "João Vitor", "Ana Beatriz",
        "Thiago", "Lavínia",
        "Antônio", "Vitória",
        "Davi Lucas", "Bianca",
        "Francisco", "Catarina",
        "Enzo Gabriel", "Larissa",
        "Bruno", "Maria Fernanda",
        "Emanuel", "Fernanda",
        "João Gabriel", "Amanda",
        "Ian", "Alícia",
        "Davi Luiz", "Carolina",
        "Rodrigo", "Agatha",
        "Otávio", "Gabrielly",
        "karhus", "Irélia", "Ashe", "Tryndamere", "Garen", "Darius", "Caitlyn", "Heimer", "Yasuo"
      ]

      let familyNames =
        [
          "Garcia", "da Silva", "Ferreira", "Melo", "Mello", "Costa", "Nunes", "Pereira", "Monteiro", "Freitas", "Cirilo",
          "Teodoro", "Rodrigues", "Bolsonaro", "da Costa", "dos Anjos", "Silva", "Moraes", "Viana", "Vianna", "Bucioli",
          "Zuviollo", "Aragão", "Piloto", "Vicente", "Gomes", "Gumieiro", "Tancredo", "Salgado", "de Jesus", "Alotonni", "Borges",
          "Mendonza", "Camargo", "Chesca", "Almeida"
        ]
      let name = names[Math.floor(Math.random() * names.length)]
      let middleName = names[Math.floor(Math.random() * names.length)]
      let familyName = familyNames[Math.floor(Math.random() * familyNames.length)]

      let test = getRandomInt(1, 10)
      if (test % 2 == 0) {
        var fullName = `${name} ${middleName} ${familyName}`
      } else {
        var fullName = `${name}  ${familyName}`
      }

      return fullName.toUpperCase()
}

function getRandomEmail(name) {
  let domains =
    [
      "gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "uol.com.br", "terra.com.br", "git.com", "hcode.com", "donateo.com.br", "artemerda.com.br", "lodeloca.com"
    ]

    const signals = ['_', '.', "-"]
    const randomSignals = signals[Math.floor(Math.random() * signals.length)]

  let domain = domains[Math.floor(Math.random() * domains.length)]
  let email = `${slugify(name,{lower: true, replacement: randomSignals})}@${domain}`
  return email
}

var data = []
for (let i = 0; i < 30; i++) {
    var name =  getRandomPeople()
    var email = getRandomEmail(name)
    var rg =  getRandomRg()
    var password = bcrypt.hashSync(rg, 10)
    var birthDate = getRandomBirthDate(1936, 2003, 1, 13, 1, 28)
    var gender = getRandomGender()

    data[i] = {
      id: randomID({ length: 8, type: 'url-safe' }),
      name: name,
      rg: rg,
      cpf: cpf.generate(),
      password: password,
      email: email,
      birthDate: birthDate,
      gender: gender,
      idRole: 10,
      createdAt: new Date(),
      updatedAt: new Date()
  }

}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('Users', 
      
      data
    
      , {})
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
