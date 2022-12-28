if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const axios = require("axios")
const { BASE_URL_APP, BASE_URL_USER } = require('../baseUrl')
const Redis = require('ioredis');

const redis = new Redis({
    host: 'redis-15182.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 15182,
    password: process.env.REDIS_PASSWORD
});

const typeDefs = `#graphql

    type News {
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
        User: UserRelation
        Category: Category
        PostTags: [PostTag]
    }

    type UserRelation {
        _id: String
        username: String
        email: String
        phoneNumber: String
        address: String
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

    type CreatedNews {
        id: ID
        title: String
        content: String
        slug: String
        imgUrl: String
        categoryId: Int
        authorMongoId: String
        createdAt: String
        updatedAt: String
    }

    input NewsInput {
        title: String
        content: String
        imgUrl: String
        tag: String
        categoryId: Int
        newsId: Int
        userId: String
    }

    type Query {
        getAllNews: [News]
        getNewsById (newsId: Int): News
    }

    type ObjectOutput {
        message: String
    }

    type Mutation {
        addNews(input: NewsInput): CreatedNews
        editNews(input: NewsInput): ObjectOutput
        deleteNews(newsId: Int): ObjectOutput
    }

`;


const resolvers = {
    Query: {
        getAllNews: async() => {
            try {
                const cache = await redis.get('newsCache')

                if(cache) {

                    return JSON.parse(cache)
                } else {

                    const {data: news} = await axios(`${BASE_URL_APP}/news`)
                    const {data: users} = await axios(`${BASE_URL_USER}/users`)
                    
                    for (const item of news) {
                        const indexOfUser = users.findIndex(element => item.authorMongoId === element["_id"])
                        item.User = users[indexOfUser]
                    }

                    await redis.set('newsCache', JSON.stringify(news))

                    return news
                }  
            } catch(err) {
                console.log(err)
            }
        },
        getNewsById: async(_, args) => {
            try {
                const {newsId} = args

                const { data: theSearchedNews } = await axios({
                    method: 'get',
                    url: `${BASE_URL_APP}/news/${newsId}`,
                });

                const { data: theSearchedUser } = await axios(`${BASE_URL_USER}/users/${theSearchedNews.authorMongoId}`)

                theSearchedNews.User = theSearchedUser
                
                return theSearchedNews
            } catch(err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        addNews: async (_, args) => { 
            try {   
                const {title, content, imgUrl, tag, categoryId, userId} = args.input

                const { data: theSearchedUser } = await axios(`${BASE_URL_USER}/users/${userId}`)

                const { data: newNews } = await axios({
                    method: 'post',
                    url: `${BASE_URL_APP}/news`,
                    data: {
                    title,
                    content,
                    imgUrl,
                    tag,
                    categoryId,
                    authorMongoId: userId
                    }
                })
                
                await redis.del('newsCache')
                
                return newNews

            } catch(err) {
                console.log(err)
            }
        },
        editNews: async(_, args) => {
            try {

                const {title, content, imgUrl, tag, categoryId, newsId} = args.input

                const { data: editedNews } = await axios({
                    method: 'put',
                    url: `${BASE_URL_APP}/news/${newsId}`,
                    data: {
                    title,
                    content,
                    imgUrl,
                    tag,
                    categoryId,
                    }
                }) 

                await redis.del('newsCache')

                return editedNews

            } catch(err) {
                console.log(err)
            }
        },
        deleteNews: async(_, args) => {
            try {
                const {newsId} = args

                const { data: deletedNews } = await axios({
                    method: 'delete',
                    url: `${BASE_URL_APP}/news/${newsId}`,
                }) 

                await redis.del('newsCache')

                return deletedNews

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