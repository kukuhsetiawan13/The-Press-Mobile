const { getDB } = require('../config/mongodb')
const { ObjectId } = require('mongodb')

class User {

    static getCollection() {
        const collection = getDB().collection('users')
        return collection
    }

    static async createUser (data) {
        try {
            const collection = this.getCollection()
            const newUser = await collection.insertOne(data)

            return newUser
        } catch(err) {
            throw err
        }
    }

    static async findAll () {
        try {
            const collection = this.getCollection()
            const users = await collection.find().toArray()


            return users
        } catch(err) {
            throw err
        }
    }

    static async findById (userId) {
        try {
            const collection = this.getCollection()
            const user = await collection.findOne({
                _id: ObjectId(userId)
            })
            
            return user
        } catch(err) {
            throw err
        }
    }

    static async deleteById(userId) {
        try {
            const collection = this.getCollection()
            const result = await collection.deleteOne({
                _id: ObjectId(userId)
            });


            if (result.deletedCount === 1) {
                return `Successfully deleted user with id ${userId}`
            } else {
                return "No documents matched the query. Deleted 0 documents."
            }
        } catch(err) {
            throw err
        }
    }
    
}

module.exports = User