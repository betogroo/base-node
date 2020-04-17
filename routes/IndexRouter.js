var express = require('express')
var router = express.Router()
const IndexController = require('../controllers/IndexController')

//router.get('/', IndexController.index)
router.get('/', IndexController.index)


router.post('/', IndexController.post)
router.post('/auth', IndexController.auth)

module.exports = router