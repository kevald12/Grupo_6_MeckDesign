function authMiddleware (req, res, next) {
	if (req.session.userLogged) {
		// Hay alguien logueado
		return res.redirect("/user/profile");
	}

	next();
}

module.exports = authMiddleware;