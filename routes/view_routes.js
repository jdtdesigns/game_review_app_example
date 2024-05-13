const router = require('express').Router()
const path = require('path')

const { redirectIfLoggedIn, redirectIfNotLoggedIn } = require('./helpers')

// Homepage
router.get('/', redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/landing.html'))
})

// Show register page
router.get('/register', redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'))
})

// Show login page
router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'))
})

// Dashboard Route
// You must use a middleware function to protect this route from guests(req.session.user_id)
router.get('/dashboard', redirectIfNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'))
})

router.get('/game', redirectIfNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add_game.html'))
})

// Show the add review form
router.get('/review/:game_id', redirectIfNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/add_review.html'))
})

// Show the review page for a single game
router.get('/reviews/:game_id', redirectIfNotLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/reviews.html'))
})

module.exports = router