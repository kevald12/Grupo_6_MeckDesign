module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define ('User', {
        firstName: DataTypes.STRING,
        lastName : DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
        admin: DataTypes.INTEGER,
        // deleted_at: DataTypes.DATETIME,
    },
    {
       tableName: 'users',       
       paranoid: true
    });
    return User;
    // Users.associate = function(models) {
    //     Users.belongsTo(models.byRoom, {
    //         as: "byRoom",
    //         foreignKey: "byRoomId"
    //     })
    // }
}