const apiPersona = require("../personas/api");

const resolvers = {
    Query: {
        async personas() {
            const personas = await apiPersona.getAll();
            return personas;
        }
    },
    Mutation: {
        async createPersona(parent, args) {
            const persona = await apiPersona.create(args);
            return persona;
        },
        async updatePersona(parent, args) {
            const persona = await apiPersona.update(args);
            return persona;
        },
        async deletePersona(parent, args) {
            const persona = await apiPersona.delete(args);
            return persona;
        }
    }
}

module.exports = { resolvers };