module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define ('User', {
        userId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
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
    User.associate = function(models) {
        User.hasMany(models.Cart, {
            as: "cart",
            foreignKey: "userId"
        })
    }
    return User;
}