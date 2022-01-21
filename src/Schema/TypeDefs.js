const { gql } = require("apollo-server-express");
const typeDefs = gql`
    #Types
    type Persona {
        id: Int
        nombre: String!
        apaterno: String!
        amaterno: String!
        direccion: String!
        telefono: String!
    }

    #Queries
    type Query {
        personas: [Persona!]!
    }

    #Mutations
    type Mutation {
        createPersona(nombre: String!, apaterno: String!, amaterno: String!, direccion: String!, telefono: String!): Persona!
        updatePersona(id: Int!, nombre: String!, apaterno: String!, amaterno: String!, direccion: String!, telefono: String!): Persona
        deletePersona(id: Int!): Persona!
    }
`

module.exports = { typeDefs };