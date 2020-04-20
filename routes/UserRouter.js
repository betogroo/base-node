var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController')
const { isAdmin, isUser } = require('../helpers/permission')
const { check } = require('express-validator')


router.get('/users', isUser, isAdmin, UserController.index)
router.get('/user/new',
//isAdmin,
UserController.new)
router.get('/user/profile', (req, res) => {
    res.send('Profile')
})
router.get('/user/:id', UserController.view)
router.get('/user/edit/:id', UserController.edit)



router.post('/user',
[
    check('name').not().isEmpty().withMessage('O campo Nome não pode ser vazio').trim(),
    check('rg').isNumeric().withMessage('O campo RG só aceita número').trim(),
    check('email').isEmail().withMessage('Email incorreto').trim()
],
UserController.post)
router.post('/user/delete/', UserController.delete)
router.post('/user/update', UserController.update)

module.exports = router