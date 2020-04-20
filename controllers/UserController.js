const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const { validationResult } = require('express-validator')
class UserController {

    //GET    
    async  index(req, res) {
        var users = await UserService.getAll()

        //res.json(users)
        res.render("user/index.ejs", { users });
    }

    async view(req, res) {
        var { id } = req.params
        if (isNaN(id)) {
            res.sendStatus(404)
        } else {
            try {
                var user = await UserService.getUser(id)
                //res.json({ user })
                res.render('user/view', { user })
            } catch (error) {
                console.log(error)
            }
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


    // POST
    async post(req, res) {
        var { name, email, rg, idRole } = req.body

        const errors = validationResult(req).array();
        var error = []
    if (errors.length > 0) {

        errors.forEach(element => {
            error.push(element.msg)
        });

    
        if (errors.length == 1) {
            req.flash('error', `${errors.length} erro: ${error.join(', ')}`)
        }else{
            req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
        }

        res.redirect('/user/new')
    }else{
        var data = { name, email, rg, idRole }
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
        var { id, name, email, idRole, rg } = req.body
        var data = { id, name, email, idRole, rg }
        var user = await UserService.update(data)
        if (user) {
            //res.json({ "msg": "Edição de usuário feita com sucesso" })
            res.redirect('/users')
        } else {
            res.json({ "msg": "Não foi possível editar o usuário" })
        }
    }




}

module.exports = new UserController