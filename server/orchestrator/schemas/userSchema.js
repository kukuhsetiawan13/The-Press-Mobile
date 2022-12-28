if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const axios = require("axios")
const { BASE_URL_USER, BASE_URL_APP } = require('../baseUrl')
const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis-15182.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 15182,
    password: process.env.REDIS_PASSWORD
});

const typeDefs = `#graphql

    type User {
        _id: String
        username: String
        email: String
        phoneNumber: String
        address: String
        Posts: [NewsRelation]
    }

    type NewsRelation {
        id: ID
        title: String
        content: String
        slug: String
        imgUrl: String
        categoryId: Int
        authorId: Int
        authorMongoId: String
        createdAt: String
        updatedAt: String
        Category: Category
        PostTags: [PostTag]
    }

    type Category {
        id: ID
        name: String
        createdAt: String
        updatedAt: String
    }

    type Tag {
        id: ID
        name: String
        createdAt: String
        updatedAt: String
    }

    type PostTag {
        id: ID
        PostId: Int
        TagId: Int
        Tag: Tag
        createdAt: String
        updatedAt: String
    }

    type Query {
        getAllUsers: [User]
        getUserById (userId: String): User
    }



    type Mutation {
        deleteUserById(userId: String): String,
    }

`;


const resolvers = {
    Query: {
        getAllUsers: async () => { 
            try {
                
                const {data: users} = await axios(`${BASE_URL_USER}/users`)
                const {data: news} = await axios(`${BASE_URL_APP}/news`)

                for (const user of users) {
                    user.Posts = []
                    for (const item of news) {
                        if(item.authorMongoId === user._id) user.Posts.push(item)
                    }
                }

                return users
            } catch(err) {
                console.log(err)
            }
        },
        getUserById: async (_, args) => { 
            try {
                const { userId } = args

                const { data: theSearchedUser } = await axios(`${BASE_URL_USER}/users/${userId}`)
                const {data: news} = await axios(`${BASE_URL_APP}/news`)

                theSearchedUser.Posts = []
                for (const item of news) {
                    if(item.authorMongoId === userId) theSearchedUser.Posts.push(item)
                }

                return theSearchedUser
            } catch(err) {
                console.log(err)
            }
        },
        
    },
    Mutation: {
        deleteUserById: async(_, args) => { 
            try {
                const { userId } = args

                const { data: deletedUser } = await axios({
                    method: 'DELETE',
                    url: `${BASE_URL_USER}/users/${userId}`
                })

                const {data: news} = await axios(`${BASE_URL_APP}/news`)

                for(const item of news) {
                    if(item.authorMongoId === userId) {
                        await axios({
                            method: 'delete',
                            url: `${BASE_URL_APP}/news/${item.id}`,
                        })
                    }
                }

                await redis.del('newsCache')

                return deletedUser
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