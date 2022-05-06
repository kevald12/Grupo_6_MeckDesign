module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        cartId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        userId: DataTypes.INTEGER,
        paymentMethod: DataTypes.INTEGER,
        totalPay: DataTypes.INTEGER,
        itemsAmount: DataTypes.INTEGER,
        shipDate: DataTypes.DATE,
        shipAddress: DataTypes.STRING,
        zipCode: DataTypes.INTEGER,
        country: DataTypes.STRING
    }, {
        tableName: 'cart',
        timestamps: false,   
    });

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId"
            }),
        Cart.belongsToMany(models.Product, {
            as: 'product',
            through: 'products_cart',
            foreignKey: 'cartId',
            otherKey: 'productId',
            timestamps: false
        })
    }
    return Cart;
}