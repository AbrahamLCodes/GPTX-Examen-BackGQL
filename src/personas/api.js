const connection = require("../db/connection");

module.exports = {
    getAll: async () => {
        console.log("getAll Personas");
        const db = await connection.getDbConnection();
        const users = await db.query("SELECT * FROM personas");
        await db.end();
        return users;
    },
    getOne: async (fields) => {
        console.log("getOne Persona");
        const db = await connection.getDbConnection();
        const id = fields.id;

        let user = await db.query("SELECT * FROM personas WHERE id=" + id);
        user = user[0];
        await db.end();
        return user;
    },
    create: async (fields) => {
        console.log("Create Persona");
        const db = await connection.getDbConnection();
        //Construir un string de asignacion de campos para no escribirlos uno por uno
        let valores = "DEFAULT, ";
        Object.keys(fields).forEach(key => {
            const asignacion = "'" + fields[key] + "', "
            valores += asignacion;
        });

        //Borrar los ultimos 2 digitos para que no marque error de SQL Syntax
        valores = valores.substring(0, valores.length - 2);
        //Construir el query completo
        const query = "INSERT INTO personas VALUES(" + valores + ")";
        await db.query(query).catch(err => {
            if (err) {
                res.json({
                    err: 505,
                    message: "No se pudo completar el query"
                });
            }
        });

        let nuevaPersona = await db.query("SELECT * FROM personas ORDER BY id DESC LIMIT 1;");
        nuevaPersona = nuevaPersona[0];
        await db.end();
        return nuevaPersona;
    },
    update: async (fields) => {
        console.log("Update Persona");
        const db = await connection.getDbConnection();

        let stringCampos = "";
        const id = fields.id;

        //Construir un string de asignacion de campos para no escribirlos uno por uno
        Object.keys(fields).forEach(key => {
            if (key !== "id") {
                const asignacion = key + "=" + "'" + fields[key] + "', "
                stringCampos += asignacion;
            }
        });
        //Borrar los ultimos 2 digitos para que no marque error de SQL Syntax
        stringCampos = stringCampos.substring(0, stringCampos.length - 2);
        //Construir el query compelto
        const query = "UPDATE personas SET " + stringCampos + " WHERE id=" + id;
        await db.query(query)

        let personaEditada = await db.query("SELECT * FROM personas WHERE id=" + id);
        personaEditada = personaEditada[0]
        await db.end();
        return personaEditada;
    },
    delete: async (fields) => {
        console.log("delete Persona");
        const db = await connection.getDbConnection();
        const id = fields.id;

        let personaE = await db.query("SELECT * FROM personas WHERE id=" + id);
        personaE = personaE[0];
        
        await db.query("DELETE FROM personas WHERE id=" + id);
        await db.end();
        
        return personaE;
    }
}

