const data = require('./db.json')
const fs = require('fs')


data.Posts.forEach( el => {
    el.slug = el.title.split(" ").join("-").replace(/,/g, "");
})


fs.writeFileSync('./data/db.json', JSON.stringify(data, null, 2))