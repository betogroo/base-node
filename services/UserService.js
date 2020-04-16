const db = require('../models/')
const { Op } = require("sequelize")
const bcrypt = require('bcryptjs')



class UserService {
    
    constructor() {
        this.User = db['User']
        this.Role = db['Role']
    }

    async getAll(){
        try {
            let users = this.User.findAll({
                include: [
                    {model: this.Role}
                ]
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

    async getUser(id){
        try {
            var user = await this.User.findByPk(id,{
                include:[
                    {
                        model: this.Role,
                        attributes: ['name']
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

    async store(data){
        try {
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
    async delete(id){
        try {
            await this.User.destroy({
                where: {id: id}
            })
        } catch (error) {
            console.log(error)
        }
    }

    async update(data){
        try {
            await this.User.update(data,{
                where: {id: data.id}
            })
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = new UserService