//nos permite hacer uso del remember me 
const {User} = require('../database/models')
const {Op} = require('sequelize')
// const fs = require("fs");
// const path = require("path");
// const filePath = path.resolve(__dirname, "../data/users.json");
// const usersDB = JSON.parse(fs.readFileSync(filePath, "utf-8"));

let autoLoginMiddleware = async function (req, res, next) {
	const emailInCookie = req.cookies.userEmail;

	if (emailInCookie) {
		const userToLogin = await User.findOne({where: {email: {[Op.like]: emailInCookie}}});
		delete userToLogin.password;
		req.session.userLogged = userToLogin;
	}

	next();
}

module.exports = autoLoginMiddleware;