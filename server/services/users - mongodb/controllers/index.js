
const User = require('../models/User')
const { generatePasswordHash } = require('../helpers/bcryptjs')

class Controller {

    static async createUser (req, res, next) {
        try {
            const { username, email, phoneNumber, address } = req.body
            
            let { password } = req.body
            password = generatePasswordHash(password)

            const newUser = await User.createUser({
                username,
                email,
                password,
                role: 'Admin',
                phoneNumber,
                address
            })


            res.status(201).json({message: `A new user with id ${newUser.insertedId} has been created`})
        } catch(err) {
            next(err)
        }
    }

    static async findAll (req, res, next) {
        try {
            
            const users = await User.findAll()
            users.forEach(el => {
                delete el.password
            })

            res.status(200).json(users)
        } catch(err) {
            next(err)
        }
    }

    static async findById (req, res, next) {
        try {
            const { userId } = req.params

            const user = await User.findById(userId)
            if(!user) throw ('Data not found')

            delete user.password

            res.status(200).json(user)
        } catch(err) {
            next(err)
        }
    }

    static async deleteById (req, res, next) {
        try {
            const { userId } = req.params

            const result = await User.deleteById(userId)


            res.status(200).json(result)
        } catch(err) {
            next(err)
        }
    }

}

module.exports = Controller