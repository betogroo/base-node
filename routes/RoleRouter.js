var express = require('express')
var router = express.Router()
const RoleController = require('../controllers/RoleController')


router.get('/roles', RoleController.index)
router.get('/role/new', (req, res) => {
    res.render('role/new')
})
router.get('/role/:id', RoleController.view)
router.get('/role/edit/:id', RoleController.edit)



router.post('/role', RoleController.post)
router.post('/role/delete/', RoleController.delete)
router.post('/role/update', RoleController.update)

module.exports = router