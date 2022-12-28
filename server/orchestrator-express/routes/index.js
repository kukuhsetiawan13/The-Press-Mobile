const router = require('express').Router()
const userRouter = require('./userRouter')
const newsRouter = require('./newsRouter')
const categoryRouter = require('./categoryRouter')


router.get('', (req, res) => {
    res.redirect('/news')
})

router.use('/users', userRouter)

router.use('/news', newsRouter)

router.use('/categories', categoryRouter)


module.exports = router