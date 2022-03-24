// admite la session para todas las vistas

function userLoggedMiddleware (req, res, next) {
	res.locals.isUserLogged = false;

	if (req.session.userLogged) {
		res.locals.isUserLogged = true;
		res.locals.userData = {
			firstName: req.session.userLogged.firstName,
            lastName: req.session.userLogged.lastName,
			avatar: req.session.userLogged.avatar,
		}
	}

	next();
}

module.exports = userLoggedMiddleware;