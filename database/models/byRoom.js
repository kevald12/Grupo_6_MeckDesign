module.exports = (sequelize, DataTypes) => {
    const ByRoom = sequelize.define('ByRoom', {
        room: DataTypes.STRING,
    }, {
        tableName: 'byRoom',
        timestamps: false
    });

    ByRoom.associate = function (models) {
        ByRoom.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'byRoomId',

        })
    }
    return ByRoom;
}