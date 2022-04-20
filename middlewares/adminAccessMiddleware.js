function adminAccessMiddleware(req, res, next) {
	if (!req.session.isAdmin) {
		return res.redirect("/products/list");
	}
	next();
}

module.exports = adminAccessMiddleware;