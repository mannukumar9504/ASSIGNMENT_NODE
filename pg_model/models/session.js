
module.exports = (sequelize, DataTypes) => {

    const Session  = sequelize.define("sessions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        session_starts_at: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        session_expires_at: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING, 
            unique: true,
            allowNull: false
        }
    }, {timestamps: true});
    return Session
};