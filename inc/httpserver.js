const winston = require('winston')
	, express = require('express')
	, bodyParser = require('body-parser')
	//, querystring = require('querystring')
	, handlebarsExpress = require('express-handlebars')

const app = express()

// Security
app.disable('x-powered-by')

// Trust nginx
app.set('trust proxy', 'loopback')

app.engine('html', handlebarsExpress.create({defaultLayout: 'main', extname: '.html'}).engine)
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/../views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app)

function errorPage(res, err) {
	res.render('errorpage.html', {error: err, section_title: 'Error'})
}

app.use((req, res) => {
	res.status(404)

	errorPage(res, '404: Page not Found')
})

app.use((err, req, res, next) => {
	res.status(500)

	errorPage(res, '500: Internal Server Error\n' + String(err))

	winston.error('HTTP 500 error: ', err)
})

module.exports = app
