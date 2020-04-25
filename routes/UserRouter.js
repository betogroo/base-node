var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController')
const { isAdmin, isUser } = require('../helpers/permission')
const validateData = require('../helpers/validateData')
const checkData = require('../helpers/checkData')




router.get('/users',
    //isAdmin,
    UserController.index)
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
        validateData.User,
        checkData.Email,
        checkData.Cpf
    ],
    UserController.post)
router.post('/user/delete/', UserController.delete)
router.post('/user/update',
    validateData.User,
    UserController.update)

module.exports = router