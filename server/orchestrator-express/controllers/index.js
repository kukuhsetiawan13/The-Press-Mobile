const axios = require("axios")
const Redis = require('ioredis');
const BASE_URL_APP = 'http://localhost:4002'
const BASE_URL_USER = 'http://localhost:4001'

const redis = new Redis({
    host: 'redis-15182.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 15182,
    password: process.env.REDIS_PASSWORD
});

class Controller {

    // USER
    // Users - find All
    static async findAll (req, res, next) { 
        try {
            // const cache = await redis.get('userCache')

            const {data: users} = await axios(`${BASE_URL_USER}/users`)
            const {data: news} = await axios(`${BASE_URL_APP}/news`)

            for (const user of users) {
                user.Posts = []
                for (const item of news) {
                    if(item.authorMongoId === user._id) user.Posts.push(item)
                }
            }

            res.status(200).json(users)
        } catch(err) {
            next(err)
        }
    }

    // Users - find By Id
    static async findById (req, res, next) { 
        try {
            const { userId } = req.params

            const { data: theSearchedUser } = await axios(`${BASE_URL_USER}/users/${userId}`)
            const {data: news} = await axios(`${BASE_URL_APP}/news`)

            theSearchedUser.Posts = []
            for (const item of news) {
                if(item.authorMongoId === userId) theSearchedUser.Posts.push(item)
            }
            
            res.status(200).json(theSearchedUser)
        } catch(err) {
            next(err)
        }
    }

    // Users - delete by ID 
    static async deleteUserById (req, res, next) {
        try {
            const { userId } = req.params

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
            res.status(200).json(deletedUser)
        } catch(err) {
            next(err)
        }
    }

    // NEWS
    // News - fetch data
    static async fetchNews (req, res, next) {
        try {
            const cache = await redis.get('newsCache')
            
            if(cache) {
                res.status(200).json(JSON.parse(cache))
            } else {
                const {data: news} = await axios(`${BASE_URL_APP}/news`)
                const {data: users} = await axios(`${BASE_URL_USER}/users`)

                for (const item of news) {
                    const indexOfUser = users.findIndex(element => item.authorMongoId === element["_id"])
                    item.User = users[indexOfUser]
                }

                await redis.set('newsCache', JSON.stringify(news))

                res.status(200).json(news)
            }           
        } catch (err) {
            next(err)
        }
    }

    // News - get news by id
    static async getNewsById (req, res, next) {
        try {
            const {newsId} = req.params

            const { data: theSearchedNews } = await axios({
                method: 'get',
                url: `${BASE_URL_APP}/news/${newsId}`,
            });

            const { data: theSearchedUser } = await axios(`${BASE_URL_USER}/users/${theSearchedNews.authorMongoId}`)

            theSearchedNews.User = theSearchedUser

            res.status(200).json(theSearchedNews)
        } catch (err) {
            next(err)
        }
    }


    // News - add news
    static async addNews(req, res, next) {
        try {
            const { userId } = req.params
            const {title, content, imgUrl, tag, categoryId} = req.body

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
            res.status(200).json(newNews)
        } catch(err) {
            next(err)
        }
    }

    // News - edit news
    static async editNews(req, res, next) {
        try {

            const {newsId} = req.params
            const {title, content, imgUrl, tag, categoryId} = req.body

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
            res.status(200).json(editedNews)
        } catch(err) {
            next(err)
        }
    }

    // News - delete news
    static async deleteNews(req, res, next) {
        try {
            const {newsId} = req.params

            const { data: deletedNews } = await axios({
                method: 'delete',
                url: `${BASE_URL_APP}/news/${newsId}`,
            }) 
            await redis.del('newsCache')
            res.status(200).json(deletedNews)

        } catch(err) {
            next(err)
        }
    }

    // CATEGORIES
    // Categories - fetch data
    static async fetchCategories (req, res, next) {
        try {
            const {data: categories} = await axios(`${BASE_URL_APP}/categories`)

            res.status(200).json(categories)
        } catch (err) {
            next(err)
        }
    }


}


module.exports = Controller