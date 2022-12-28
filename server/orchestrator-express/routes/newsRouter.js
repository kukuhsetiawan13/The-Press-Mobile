const router = require('express').Router()
const Controller = require('../controllers')

router.get('', Controller.fetchNews)

router.get('/:newsId', Controller.getNewsById)

router.post('/:userId', Controller.addNews)

router.put('/:newsId', Controller.editNews)

router.delete('/:newsId', Controller.deleteNews)


module.exports = router