var express = require('express')
var router = express.Router()
const IndexController = require('../controllers/IndexController')
const { check } = require('express-validator')
const { isAdmin, isUser } = require('../helpers/permission')

//router.get('/', IndexController.index)
router.get('/', IndexController.index)
router.get('/logout', IndexController.logout)


router.post('/',
[
    check('email').isEmail().withMessage("Email Inválido"),
    check('password').isLength({ min: 5, max:10 }).withMessage('Senha deve ser entre 5 e 10 digitos').isNumeric().withMessage("Apenas numeros")
  ],
IndexController.post)
router.post('/auth', IndexController.auth)

module.exports = router