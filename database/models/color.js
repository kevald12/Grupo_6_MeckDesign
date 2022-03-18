module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        color: DataTypes.STRING,
    }, {
        tableName: 'color',
        timestamps: true,
        createdAt: true,
        updatedAt: true
    });

    Color.associate = function (models) {
        Color.belongsToMany(models.Product, {
            as: 'product',
            through: 'product_color',
            foreignKey: 'colorId',
            otherKey: 'productId'

        })
    }
    return Color;
}