const router = require('express').Router()
const Controller = require('../controllers')


// find All
router.get('', Controller.findAll)

// find By Id
router.get('/:userId', Controller.findById)

// delete By Id
router.delete('/:userId', Controller.deleteUserById)


module.exports = router