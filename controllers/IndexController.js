const passport = require('passport')
class IndexController {

    //GET    
    index(req, res) {
        res.render("index.ejs");
    }


    // POST
    post(req, res) {
        var { id, name } = req.body
        var data = { id, name }
        res.json(data)
    }

    auth(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next)
    }


}

module.exports = new IndexController