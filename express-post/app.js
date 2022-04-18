const express = require('express')
const app = express()
const hbs = require('hbs')

// this sets hbs as a templating engine for this express app
app.set('view engine', 'hbs')

// this line is needed for express to retrieve the body of a post request
app.use(express.urlencoded({ extended: false }))

let accessCount = 0

function counter() {
	// the middleware always returns a request handler
	return (req, res, next) => {
		// 
		accessCount++
		console.log(accessCount)
		// now we proceed as intended
		next();
	}
}

// this registers a middleware globally (for all the routes)
app.use(counter())

// this is how you add a middleware to one route
app.get('/', counter(), (req, res) => {
	res.render('form')
})

app.post('/post-example', (req, res) => {
	// access the request body
	// const username = req.body.username
	// const password = req.body.password
	const { username, password } = req.body
	res.render('dashboard', { username: username })
})

app.listen(3000, function () {
	console.log('server listening')
})