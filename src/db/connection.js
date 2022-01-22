const mysql = require('promise-mysql');
module.exports = {
    getDbConnection: async () => {
        return await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
}