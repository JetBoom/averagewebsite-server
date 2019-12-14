const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('skills.html', {section_title: 'Skills'})
})

module.exports = router
