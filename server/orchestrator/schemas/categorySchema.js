if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const axios = require("axios")
const { BASE_URL_APP } = require('../baseUrl')
const Redis = require('ioredis');

const typeDefs = `#graphql

    type Category {
        id: ID
        name: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        getAllCategories: [Category]
    }

`;


const resolvers = {
    Query: {
        getAllCategories: async() => {
            try {

                const {data: categories} = await axios(`${BASE_URL_APP}/categories`)
                
                return categories
                
            } catch(err) {
                console.log(err)
            }
        }
    }

};


module.exports = {
    typeDefs, 
    resolvers
}