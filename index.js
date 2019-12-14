const httpserver = require('./inc/httpserver.js')

httpserver.listen(8051)

function SIGINT() {
	if (global.exiting)
		return
	global.exiting = true

	try {
		httpserver.close()
	}
	catch (e) {}

	process.exit(0)
}
process.on('SIGINT', SIGINT)
