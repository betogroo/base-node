var express = require('express')
var router = express.Router()
const RoleController = require('../controllers/RoleController')
const { check } = require('express-validator')
const { isAdmin} = require('../helpers/permission')


router.get('/roles', RoleController.index)
router.get('/role/new', (req, res) => {
    res.render('role/new')
})
router.get('/role/:id', RoleController.view)
router.get('/role/edit/:id', RoleController.edit)



router.post('/role', 
check('name').not().isEmpty().withMessage('O campo não pode ser vazio').trim(),
RoleController.post)
router.post('/role/delete/', RoleController.delete)
router.post('/role/update', RoleController.update)

module.exports = router