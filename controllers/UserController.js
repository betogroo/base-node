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
        var limit = 50

        if (!page || isNaN(page) || page == 1 || page == 0) {
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
        if (page > users.pages) {
            res.send("Erro 404 - Página não encontrada")
        }
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
            console.log(error)
        }
    }
    profile(req, res) {
        res.render('user/profile.ejs')
    }
    editPassword(req, res) {
        res.render('user/password-edit.ejs', { moment })
    }


    // POST


    async updatePassword(req, res) {
        var { password, passwordMatch, passwordNew } = req.body
        var data = { password, passwordMatch, passwordNew }


        var errors = validationResult(req).array();
        if (errors.length > 0) {
            var error = []
            for (let i = 0; i < errors.length; i++) {
                error[i] = { "msg": `<div class="alert alert-danger mt-1">${errors[i].msg} </div>`, "param": errors[i].param }
            }
            req.flash('alert', error)
            res.redirect('/profile/password')
        } else {
            var match = bcrypt.compareSync(password, res.locals.userLogged.password)
            if (match) {
                data.id = res.locals.userLogged.id
                data.password = passwordNew
                var user = await UserService.update(data)
                req.logout()
                req.flash('success', 'Senha alterada com sucesso. Faça o login novamente!')
                res.redirect('/')
                //res.json({ data, user })
            } else {
                req.flash('error', `<div class="alert alert-danger mt-1">Senha Incorreta</div>`)
                res.redirect('/profile/password')
            }


        }

        //res.json({data})
    }

    async post(req, res) {
        var { name, email, rg, cpf, birthDate, gender, idRole } = req.body
        var error = []
        let errors = validationResult(req).array();
        //res.json(errors) test errors array

        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                error[i] = { "msg": `<div class="alert alert-danger mt-1">${errors[i].msg} </div>`, "param": errors[i].param }
            }
            req.flash('alert', error)
            res.redirect('/user/new')
        } else {
            var data = { name, email, rg, cpf, birthDate, gender, idRole }
            data.password = rg.substring(0, 5)
            try {
                var user = await UserService.store(data)
                req.flash('alert', `<div class="alert alert-success mt-1">Usuário ${user.name} cadastrado com sucesso</div>`) // coloquei error para testar a variável
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
            req.flash('alert', `<div class="alert alert-success mt-1">Usuário excluído com sucesso</div>`) // coloquei alertor para testar a variável
            res.redirect('/users')
        } else {
            req.flash('alert', `<div class="alert alert-success mt-1">Não foi possível exluir o usuário</div>`) // coloquei error para testar a variável
            res.redirect('/users')
        }
    }

    async update(req, res) {
        var { id, name, email, idRole, birthDate, gender, rg, cpf } = req.body
        var error = []
        let errors = validationResult(req).array();

        if (errors.length > 0) {
            for (let i = 0; i < errors.length; i++) {
                error[i] = { "msg": `<div class="alert alert-danger mt-1">${errors[i].msg} </div>`, "param": errors[i].param }
            }
            req.flash('alert', error)
            res.redirect(`/user/edit/${id}`)
        } else {

            try {
                var data = { id, name, email, birthDate, gender, idRole, rg, cpf }
                var user = await UserService.update(data)
                if (user) {
                    req.flash('alert', `<div class="alert alert-success mt-1">Usuário ${name} editado com sucesso</div>`)
                    res.redirect('/users')
                } else {
                    req.flash('alert', `Não foi possível editar`)
                    res.redirect(`/user/edit/${id}`)
                }
            } catch (error) {
                console.log(error)
            }

        }
    }
    async updateProfile(req, res) {
        var { id, name, email, idRole, birthDate, gender, rg, cpf, password } = req.body
        var error = []
        let errors = validationResult(req).array();

        if (errors.length > 0) {

            for (let i = 0; i < errors.length; i++) {
                error[i] = { "msg": `<div class="alert alert-danger mt-1">${errors[i].msg}</div>`, "param": errors[i].param }
            }


            req.flash('alert', error)
            res.redirect('/profile')

        } else {
            var match = bcrypt.compareSync(password, res.locals.userLogged.password)
            //res.json({ "digitada": password, "Sistema": res.locals.userLogged.password })
            if (match) {
                try {
                    var data = { id, name, email, birthDate, gender, idRole, rg, cpf }
                    var user = await UserService.update(data)
                    if (user) {
                        req.flash('success', `<div class="alert alert-success mt-1">Perfil alterado com sucesso!</div>`) // tem que ser success aqui
                        res.redirect('/profile')
                    } else {
                        req.flash('success', `Não foi possível editar`)
                        res.redirect('/profile')
                    }
                } catch (error) {
                    console.log(error)
                }
            } else {

                req.flash('success', `<div class="alert alert-danger mt-1">Não foi possível alterar. Senha incorreta!</div>`)
                res.redirect('/profile')
            }

        }
    }

}

module.exports = new UserController