if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')

const userSchema = require('./schemas/userSchema')
const newsSchema = require('./schemas/newsSchema')
const categorySchema = require('./schemas/categorySchema')


const server = new ApolloServer({
    typeDefs: [userSchema.typeDefs, newsSchema.typeDefs, categorySchema.typeDefs],
    resolvers: [userSchema.resolvers, newsSchema.resolvers, categorySchema.resolvers],
});

startStandaloneServer(server, {
    listen: { port: 4000 },
})
.then( ({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
})
.catch(console.log)