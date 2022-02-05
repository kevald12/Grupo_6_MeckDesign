//nos permite hacer uso del remember me 

const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../data/users.json");
const usersDB = JSON.parse(fs.readFileSync(filePath, "utf-8"));

function autoLoginMiddleware (req, res, next) {
	const emailInCookie = req.cookies.userEmail;

	if (emailInCookie) {
		const userToLogin = usersDB.find(oneUser => oneUser.email === emailInCookie);
		delete userToLogin.password;
		req.session.userLogged = userToLogin;
	}

	next();
}

module.exports = autoLoginMiddleware;