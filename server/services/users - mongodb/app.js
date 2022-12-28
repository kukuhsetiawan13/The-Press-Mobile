if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')
const routes = require('./routes')
const { mongoConnect } = require('./config/mongodb')
const {errorHandler} = require('./middlewares/errorHandler')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

app.use(errorHandler)

mongoConnect().then( async (database) => {
    
    // const users = database.collection('users');
    // const query = { name: 'John Doe' };
    // const user = await users.findOne(query);
    // console.log(user);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})
