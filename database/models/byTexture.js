module.exports = (sequelize, DataTypes) => {
    const ByTexture = sequelize.define('ByTexture', {
        texture: DataTypes.STRING,
    }, {
        tableName: 'byTexture',
        timestamps: false
    });

    ByTexture.associate = function (models) {
        ByTexture.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'byTextureId',

        })
    }
    return ByTexture;
}