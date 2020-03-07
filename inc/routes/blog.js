const fs = require('fs')
	, path = require('path')
	, winston = require('winston')

const router = require('express').Router()

let blogPosts = [],
	nextBlogPostsUpdate = 0

function updateBlogPosts() {
	const dir = __dirname + '/../../assets/blogposts'
	try {
		const files = fs.readdirSync(dir)

		let file, data

		blogPosts = []

		for (let filename of files) {
			file = dir + '/' + filename

			if (fs.lstatSync(file).isDirectory())
				continue

			data = fs.readFileSync(file, 'utf8').split('\n')

			blogPosts.push({
				id: path.parse(filename).name,
				title: data[0],
				date: data[1],
				timestamp: new Date(data[1]).getTime(),
				text: data.slice(2).join('\n')
			})
		}

		blogPosts.sort((a, b) => {
			return b.timestamp - a.timestamp
		})
	}
	catch (e) {
		winston.warn('Error updating blog posts: %s', String(e))
	}
}

router.get('/', (req, res) => {
	if (Date.now() >= nextBlogPostsUpdate) {
		nextBlogPostsUpdate = Date.now() + 60000
		updateBlogPosts()
	}

	res.render('blog.html', {section_title: 'Blog', posts: blogPosts})
})

module.exports = router
