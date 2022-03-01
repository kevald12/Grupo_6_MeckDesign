module.exports = (sequelize,DataTypes) => {
    const Product = sequelize.define ('Products', {
        name: DataTypes.STRING,
        price:DataTypes.DECIMAL,
        description:DataTypes.STRING,
        byRoomId: DataTypes.INTEGER,
        byTextureId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        colorId: DataTypes.INTEGER,
        deleted_at: DataTypes.DATETIME,
        stock: DataTypes.INTEGER
    },
    {
       tableName: 'products',
       paranoid: true
    });

    Product.associate = function(models) {
        Product.belongsTo(models.byRoom, {
            as: "byRoom",
            foreignKey: "byRoomId"
        })
    }
}