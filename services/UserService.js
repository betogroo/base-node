const db = require('../models/')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')
const randomID = require('crypto-random-string');




class UserService {

    constructor() {
        this.User = db['User']
        this.Role = db['Role']
    }

    async getAll(order = 'createdAt') {
        try {
            let users = this.User.findAll({
                include: [
                    {
                        model: this.Role,
                        attributes: ['id', 'name']
                    }
                ],
                order: [[order, 'DESC']]
            })
            if (users) {
                return users
            } else {
                return "Erro ao listar usuários"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(id) {
        try {
            var user = await this.User.findByPk(id, {
                include: [
                    {
                        model: this.Role,
                        attributes: ['id', 'name']
                    }
                ]
            })
            if (user) {
                return user
            } else {
                return "Erro ao buscar Usuário"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email) {
        try {
            var user = await this.User.findOne({
                where: {
                    email: email
                }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async store(data) {
        try {
            data.id = randomID({length: 7, type: 'url-safe'})
            var user = await this.User.create(data)
            if (user) {
                return user
            } else {
                return "Erro ao Gravar usuário"
            }
        } catch (error) {
            console.log(error)
        }
    }
    async delete(id) {
        try {
            var user = await this.User.destroy({
                where: { id: id }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async update(data) {
        try {
            var user = await this.User.update(data, {
                where: { id: data.id }
            })
            return user
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new UserService