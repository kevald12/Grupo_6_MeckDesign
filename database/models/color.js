module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        color: DataTypes.STRING,
    }, {
        tableName: 'color',
        timestamps: false
    });

    Color.associate = function (models) {
        Color.belongsToMany(models.Product, {
            as: 'product',
            through: 'product_color',
            foreignKey: 'productId',
            otherKey: 'colorId'

        })
    }
    return Color;
}