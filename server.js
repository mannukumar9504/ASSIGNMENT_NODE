const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./config/config');
require('./db_connection/mongo_connection');
const { SERVER_PORT } = process.env;

const app = express();
//const whitelist = ['http://localhost:4200'];

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json())
app.use(['/api/v1', '/api/v2'],require('./config/router.config'));


app.listen(SERVER_PORT, () => {
    console.log("server is running on port "+ SERVER_PORT);
})

