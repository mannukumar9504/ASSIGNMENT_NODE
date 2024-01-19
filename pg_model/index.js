const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:postgres@localhost:5432/maindatabase`, {dialect: 'postgres' , logging: false});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./models/user') (sequelize, DataTypes);

//exporting the module
module.exports = db