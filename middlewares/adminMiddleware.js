function adminMiddleware (req, res, next) {
	res.locals.isUserAdmin = false;

	if (req.session.isAdmin) {
		res.locals.isUserAdmin = true;
	}

	next();
}

module.exports = adminMiddleware;