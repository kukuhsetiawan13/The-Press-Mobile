const {sequelize} = require('../models')
const { Category, Post, Tag, PostTags} = require('../models')
const {verifyHash} = require('../helpers/bcryptjs')
const { signToken } = require('../helpers/jwt')


class Controller {
    // NEWS

    // News - fetch data
    static async fetchNews (req, res, next) {
        try {
            const news = await Post.findAll({
                order: [['id', 'ASC']],
                include: [
                    Category,
                    {
                        model: PostTags,
                        include: {
                            model: Tag
                        }
                    }
                ]
            })
            res.status(200).json(news)
        } catch (err) {
            next(err)
        }
    }

    // News - get news by id
    static async getNewsById (req, res, next) {
        try {
            const {newsId} = req.params

            const news = await Post.findByPk(newsId, {
                include: [
                    Category,
                    {
                        model: PostTags,
                        include: {
                            model: Tag
                        }
                    }
                ]
            })

            if(!news) throw ('Data not found')

            res.status(200).json(news)
        } catch (err) {
            next(err)
        }
    }


    // News - add news
    static async addNews(req, res, next) {
        const t = await sequelize.transaction();
        try {
            
            const {title, content, imgUrl, tag, categoryId, authorMongoId} = req.body

            let slug = ''
            if(title) slug = title.split(" ").join("-").replace(/,/g, "");

            const theSearchedCategory = await Category.findByPk(+categoryId)
            if (!theSearchedCategory) throw ('Data not found')
            
            const newNews = await Post.create({
                title,
                slug, 
                content,
                imgUrl,
                categoryId,
                authorMongoId
            }, { transaction: t })

            const [theSearchedTags, created] = await Tag.findOrCreate({
                where: { name: tag },
                defaults: {
                    name: tag
                }, 
                transaction: t 
            }); 
            
            const newPostTag = await PostTags.create({
                PostId: newNews.id,
                TagId: theSearchedTags.id
            }, { transaction: t })

            await t.commit();
            res.status(201).json(newNews)

        } catch(err) {
            await t.rollback();
            next(err)
        }
    }

    // News - edit news
    static async editNews(req, res, next) {
        const t = await sequelize.transaction();
        try {

            const {newsId} = req.params
            const {title, content, imgUrl, tag, categoryId} = req.body

            const theSearchedNews = await Post.findByPk(newsId)
            if(!theSearchedNews) throw ('Data not found')

            const theSearchedCategory = await Category.findByPk(+categoryId)
            if (!theSearchedCategory) throw ('Data not found')

            let slug = ''
            if(content) slug = content.split(" ").join("-")

            const editedNews = await Post.update({ 
                title, 
                content,
                slug,
                imgUrl,
                categoryId,
            }, {
                where: {
                  id: theSearchedNews.id
                },
                returning: ['*'],
                transaction: t 
            });

            const [theSearchedTag, created] = await Tag.findOrCreate({
                where: { name: tag },
                defaults: {
                    name: tag
                },
                transaction: t
            }); 
            
            const editedPostTag = await PostTags.update({
                TagId: theSearchedTag.id
            }, {
                where: {
                  PostId: theSearchedNews.id  
                },
                transaction: t
            })
            await t.commit();
            res.status(200).json({message: `Post with id ${theSearchedNews.id} has been edited`})
        } catch(err) {
            await t.rollback();
            next(err)
        }
    }

    // News - delete news
    static async deleteNews(req, res, next) {
        try {
            const {newsId} = req.params
            
            const theSearchedNews = await Post.findByPk(newsId)
            if(!theSearchedNews) throw ('Data not found')

            await Post.destroy({
                where: {
                    id: theSearchedNews.id
                }
            })

            res.status(200).json({message: `Post with id ${theSearchedNews.id} has been deleted`})

        } catch(err) {
            next(err)
        }
    }

    // CATEGORIES
    // Categories - fetch data
    static async fetchCategories (req, res, next) {
        try {
            const categories = await Category.findAll({
                order: [['id', 'ASC']],
            })
            res.status(200).json(categories)
        } catch (err) {
            next(err)
        }
    }



}


module.exports = Controller