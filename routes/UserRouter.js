var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController')
const { isAdmin, isUser } = require('../helpers/permission')


router.get('/users', isUser, UserController.index)
router.get('/user/new', isAdmin, UserController.new)
router.get('/user/profile', (req, res) => {
    res.send('Profile')
})
router.get('/user/:id', UserController.view)
router.get('/user/edit/:id', UserController.edit)



router.post('/user', UserController.post)
router.post('/user/delete/', UserController.delete)
router.post('/user/update', UserController.update)

module.exports = router