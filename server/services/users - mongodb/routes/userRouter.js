const router = require('express').Router()
const Controller = require('../controllers')


router.post("/", Controller.createUser)

router.get("/", Controller.findAll)

router.get("/:userId", Controller.findById)

router.delete("/:userId", Controller.deleteById)



module.exports = router