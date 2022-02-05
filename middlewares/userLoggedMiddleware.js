// admite la session para todas las vistas

function userLoggedMiddleware (req, res, next) {
	res.locals.isUserLogged = false;

	if (req.session.userLogged) {
		res.locals.isUserLogged = true;
		res.locals.userData = {
			firstName: req.session.userLogged.first_name,
            lastName: req.session.userLogged.last_name,
			avatar: req.session.userLogged.userAvatar,
		}
	}

	next();
}

module.exports = userLoggedMiddleware;