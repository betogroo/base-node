const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const bcrypt = require('bcryptjs')
const { cpf } = require('cpf-cnpj-validator')
const { validationResult } = require('express-validator')
const moment = require('moment')
require('moment/locale/pt-br')

class UserController {



    //GET    
    async  index(req, res) {
        var { page } = req.query
        var limit = 5

        if (!page || isNaN(page) || page == 1) {
            page = 1
            var offset = 0
        } else {
            page = parseInt(page)
            var offset = (parseInt(page) - 1) * limit
        }
        
        var users = await UserService.getAll(offset, limit, 'idRole')

        users.page = page
        users.offset = offset
        users.limit = limit
        users.next = users.page + 1
        users.previous = users.page - 1
        
        if (users.count % limit == 0) {
            users.pages = Math.trunc(users.count / users.limit)
        } else {
            users.pages = Math.trunc(users.count / users.limit) + 1
        }


    //res.json(users)
        res.render("user/index.ejs", { users, cpf, moment });
    }

    async view(req, res) {
        var { id } = req.params

        try {
            var user = await UserService.getUser(id)
            //res.json({ user })
            res.render('user/view', { user, cpf, moment })
        } catch (error) {
            console.log(error)
        }


    }

    async new(req, res) {
        var roles = await RoleService.getAll()
        res.render('user/new', { roles })
    }

    async edit(req, res) {
        var { id } = req.params
        try {
            var user = await UserService.getUser(id)
            var roles = await RoleService.getRolesExcludeId(user.Role.id)
            //res.json({ user, roles })
            res.render('user/edit.ejs', { user, roles })
        } catch (error) {

        }
    }
    profile(req, res){
        res.render('user/profile.ejs')
    }


    // POST
    async post(req, res) {
        var { name, email, rg, cpf, birthDate, gender, idRole } = req.body

        let errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {

            var element = ""
            for (let i = 0; i < errors.length; i++) {
                element += `${i + 1} - ${errors[i].msg} `;
            }
            //res.json(element)
            req.flash('error', `${errors.length} erros: ${element}`)
            res.redirect('/user/new')
        } else {
            var data = { name, email, rg, cpf, birthDate, gender, idRole }
            data.password = rg.substring(0, 5)
            try {
                var user = await UserService.store(data)
                //res.json({ user })
                res.redirect('/users')
            } catch (error) {
                console.log(error)
            }
        }
    }

    async delete(req, res) {
        var { id } = req.body
        var user = await UserService.delete(id)
        if (user) {
            //res.json({ "msg": "Usuário " + id + " deletado com sucesso" })
            res.redirect('/users')
        } else {
            res.json({ "msg": `Não foi possível excluir o usuário ${id}` })
        }
    }

    async update(req, res) {
        var { id, name, email, idRole, birthDate, gender, rg, cpf } = req.body
        let errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {

            errors.forEach(element => {
                error.push(element.msg)
            });


            if (errors.length == 1) {
                req.flash('error', `${errors.length} erro: ${error.join(', ')}`)
            } else {
                req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
            }

            res.redirect('/user/edit/' + id)
        } else {

            try {
                var data = { id, name, email, birthDate, gender, idRole, rg, cpf }
                var user = await UserService.update(data)
                if (user) {
                    req.flash('success', `Usuário ${id} editado com sucesso`)
                    res.redirect('/users')
                } else {
                    req.flash('success', `Não foi possível editar`)
                    res.redirect('/user/edit/' + id)
                }
            } catch (error) {
                console.log(error)
            }

        }
    }
    async updateProfile(req, res) {
        var { id, name, email, idRole, birthDate, gender, rg, cpf, password } = req.body
        
        req.session.beto = req.user


        let errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {

            errors.forEach(element => {
                error.push(element.msg)
            });


            if (errors.length == 1) {
                req.flash('error', `${errors.length} erro: ${error.join(', ')}`)
            } else {
                req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
            }

            res.redirect('/profile')
        } else {
            var match = bcrypt.compareSync(password, res.locals.userLogged.password)

            if (match) {
                try {
                    var data = { id, name, email, birthDate, gender, idRole, rg, cpf }
                    var user = await UserService.update(data)
                    if (user) {
                        req.flash('success', `Perfil alterado com sucesso`)
                        res.redirect('/profile')
                    } else {
                        req.flash('error', `Não foi possível editar`)
                        res.redirect('/profile')
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {
                req.flash('error', 'Senha incorreta')
                res.redirect('/profile')
            }

           

        }

       
        


    }

}

module.exports = new UserController