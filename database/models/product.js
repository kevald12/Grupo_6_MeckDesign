module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        description: DataTypes.STRING,
        byRoomId: DataTypes.INTEGER,
        byTextureId: DataTypes.INTEGER,
        image: DataTypes.STRING,
        // createdAt: {
        //     field: "created_at",
        //     type: DataTypes.DATE
        // },
        // updatedAt: {
        //     field: "updated_at",
        //     type: DataTypes.DATE
        // },
        // deletedAt: {
        //     field: "deleted_at",
        //     type: DataTypes.DATE
        // },
        // deleted_at: DataTypes.DATETIME,
        stock: DataTypes.INTEGER
    }, {
        tableName: 'products',
        paranoid: true,
        timestamps: true,
        // underscored: true
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
            otherKey: 'colorId'

        })
    }
    return Product;
}