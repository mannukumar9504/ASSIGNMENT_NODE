const { Client } = require('pg');
const {PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT} = process.env;

const client = new Client( {
user: PG_USER,
host: PG_HOST,
database: PG_DATABASE,
port: PG_PORT,
password: PG_PASSWORD
})
client.connect((err) => {
    if(!err) {
        console.log('Conected to postgresql server successfully');
    } else {
        console.error("postgres connection error==>",err);
        throw err;
    }

})