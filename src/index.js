require('dotenv').config()
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");

const app = express();
const PORT = 3000;

app.listen({ port: process.env.PORT }, async () => {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    
    console.log("Server listening in http://localhost:3000");
})