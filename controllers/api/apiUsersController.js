const {User} = require ('../../database/models');
// const{Op} = require('sequelize');
// const res = require('express/lib/response');

module.exports = {
    show: async (req,res) => {
const users = await User.findAll();
// console.log("users COMPLETO", users.User.dataValues.userId)
return res.json({
    total: users.length,
    users: users,
    status: 200
})
    },
    detail:  async (req,res) =>{ 
        const id = req.params.id
        const userFounded = await User.findByPk(id)
        const oneUser = {
            firstName: userFounded.dataValues.firstName,
            lastName: userFounded.dataValues.lastName,
            email: userFounded.dataValues.email,
            avatarURL: `http://localhost:4000/img/usersImg/${userFounded.dataValues.avatar}`
        }
        return res.json({
            status: 200,
            user: oneUser
        })
    }
}