const router = require('express').Router()
const Controller = require('../controllers')


router.get('', Controller.fetchCategories)




module.exports = router