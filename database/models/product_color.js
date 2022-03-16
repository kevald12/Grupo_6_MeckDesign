module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define('ProductColor', {
        colorId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        tableName: 'product_color',
        timestamps: false
    });

    ProductColor.associate = function (models) {
        ProductColor.belongsToMany(models.Product, {
            as: 'color',
            through: 'product_color',
            foreignKey: 'productId',
            otherKey: 'colorId'

        })
    }
    return ProductColor;
}