module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        byRoomId: DataTypes.INTEGER,
        byTextureId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        stock: DataTypes.INTEGER
    }, {
        tableName: 'products',
        paranoid: true,
        timestamps: true,
        createdAt: true,
        updatedAt: true
        
    });

    Product.associate = function (models) {
        Product.belongsTo(models.ByRoom, {
                as: "byRoom",
                foreignKey: "byRoomId"
            }),
            Product.belongsTo(models.ByTexture, {
                as: "byTexture",
                foreignKey: "byTextureId"
            })

        Product.belongsToMany(models.Color, {
            as: 'color',
            through: 'product_color',
            foreignKey: 'productId',
            otherKey: 'colorId',
            timestamps: false

        })
    }
    return Product;
}