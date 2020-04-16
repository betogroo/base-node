var express = require('express')
var router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/users', UserController.index)
router.get('/user/:id', UserController.view)
router.get('/admin/user/edit/:id', UserController.edit)



router.post('/user', UserController.post)
router.post('/user/delete/', UserController.delete)
router.post('/user/update', UserController.update)

module.exports = router