module.exports = function(app) {
	app.use('/', require('./home.js'))
	app.use('/blog', require('./blog.js'))
	app.use('/skills', require('./skills.js'))
}
