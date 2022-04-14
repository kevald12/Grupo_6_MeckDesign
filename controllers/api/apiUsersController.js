const {User} = require ('../../database/models');


module.exports = {
    show: async (req,res) => {
const users = await User.findAll();
    let usersArray = users.map(oneUser =>{
    let usuario = {
            id: oneUser.dataValues.userId,
            firstName: oneUser.dataValues.firstName,
            lastName: oneUser.dataValues.lastName,
            email: oneUser.dataValues.email,
            detail: `http://localhost:4000/api/users/${oneUser.dataValues.userId}`,
        }
        return usuario
    })
return res.status(200).json({
    total: users.length,
    users: usersArray,
    status: 200
})},
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