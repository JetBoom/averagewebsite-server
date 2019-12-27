const httpserver = require('./inc/httpserver.js')

httpserver.listen(8051)

function SIGINT() {
	if (global.exiting)
		return process.exit(0)
	global.exiting = true

	console.log('Exiting')

	try {
		httpserver.close()
	}
	catch (e) {}

	process.exit(0)
}
process.on('SIGINT', SIGINT)
