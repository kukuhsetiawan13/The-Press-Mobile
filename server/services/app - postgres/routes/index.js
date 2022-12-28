const router = require('express').Router()
const newsRouter = require('./newsRouter')
const categoryRouter = require('./categoryRouter')
const Controller = require('../controllers')



router.get('', (req, res) => {
    res.redirect('/news')
})



router.use('/news', newsRouter)

router.use('/categories', categoryRouter)


module.exports = router