const RoleService = require('../services/RoleService')
class RoleController {

    //GET    
    async  index(req, res) {
        var roles = await RoleService.getAll()
        //res.json(roles)
        res.render("role/index.ejs", { roles });
    }

    async view(req, res) {
        var { id } = req.params
        try {
            var role = await RoleService.getRole(id)
            //res.json({ role })
            res.render('role/view', { role })
        } catch (error) {
            console.log(error)
        }
    }

    async edit(req, res) {
        var { id } = req.params
        try {
            var role = await RoleService.getRole(id)

            //res.json({ role })
            res.render('role/edit', { role })
        } catch (error) {

        }
    }


    // POST
    async post(req, res) {
        var { id, name } = req.body
        var data = { id, name }
        try {
            var role = await RoleService.store(data)
            //res.json({ role })
            res.redirect('/roles')
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res) {
        var { id } = req.body
        var role = await RoleService.delete(id)
        if (role) {
            //res.json({ "msg": "Permissão " + id + " deletada com sucesso" })
            res.redirect('/roles')
        } else {
            res.json({ "msg": "Não foi possível escluir a permissão" })
        }
    }
    async update(req, res) {
        var { id, name } = req.body
        var data = { id, name }
        //res.json({ data })
        var role = await RoleService.update(data)
        if (role) {
            //res.json({ "msg": "Edição de permissão feita com sucesso" })
            res.redirect('/roles')
        } else {
            res.json({ "msg": "Não foi possível editar a permissão" })
        }
    }




}

module.exports = new RoleController