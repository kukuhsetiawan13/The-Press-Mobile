const data = require('./db.json')
const authors = require('./authors.json')
const fs = require('fs')

for (let index = 0; index < data.Posts.length; index++) {
    data.Posts[index].authorMongoId = authors[index]["_id"] 
}


fs.writeFileSync('./data/db.json', JSON.stringify(data, null, 2))