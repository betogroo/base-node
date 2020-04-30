const passport = require('passport')
const { validationResult } = require('express-validator')
class IndexController {

    //GET    
    index(req, res) {
        res.render("index.ejs");

    }

    logout(req, res) {

        req.logout()
        req.flash('success', 'Você saiu com segurança!')
        res.redirect('/')

    }

    // POST
    post(req, res) {
        var { id, email, password } = req.body

        const errors = validationResult(req).array();
        var error = []
        if (errors.length > 0) {

            errors.forEach(element => {
                error.push(element.msg)
            });


            req.flash('error', `${errors.length} erros: ${error.join(', ')}`)
            res.redirect('/')
        } else {

            var data = { id, email, password }
            res.json(data)
        }
    }

    auth(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            badRequestmessage: 'tudo errado',
            failureFlash: true
        })(req, res, next)
    }


}

module.exports = new IndexController