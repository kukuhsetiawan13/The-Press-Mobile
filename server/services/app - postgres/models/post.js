'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Post.belongsTo(models.User, {
      //   foreignKey: 'authorId'
      // })

      Post.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })

      Post.hasMany(models.PostTags, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

    }
  }
  Post.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Title can not be empty'},
        notEmpty: {msg: 'Title can not be empty'},
      }
    }, 
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Slug can not be empty'},
        notEmpty: {msg: 'Slug can not be empty'},
      }
    }, 
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: 'Content can not be empty'},
        notEmpty: {msg: 'Content can not be empty'},
      }
    }, 
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    authorMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  

  return Post;
};