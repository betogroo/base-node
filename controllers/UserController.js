const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
class UserController {

    //GET    
   async  index(req, res) {
        var users = await UserService.getAll()
        res.json(users)
        //res.render("user/index.ejs");
    }

    async view(req,res){
        var {id} = req.params
        try {
            var user = await UserService.getUser(id)
            res.json({user})
        } catch (error) {
            console.log(error)
        }
    }

    async edit(req, res){
        var {id} = req.params
        try {
            var user = await UserService.getUser(id)
            var role = await RoleService.getAll()
            res.json({user, role})
        } catch (error) {
            
        }
    }


    // POST
    async post(req, res) {
        var { name, email, password, idRole } = req.body
        var data = { name, email, password, idRole }
        try {
            var user = await UserService.store(data)
            res.json({user})
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res){
        var {id} = req.body
        var user = await UserService.delete(id)
        if (user) {
            res.json({"msg": "Usuário" + id + "deletado com sucesso"})
        } else {
            
        }
    }
    async update(req, res){
        var {id, name, email, idRole, password} = req.body
        var data = {id, name, email, idRole, password}
        var user = await UserService.update(data)
    }




}

module.exports = new UserController