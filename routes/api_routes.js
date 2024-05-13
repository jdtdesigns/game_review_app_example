const router = require('express').Router()
const { redirectIfNotLoggedIn } = require('./helpers')

const { User, Review, Game } = require('../models')


// Create Review
router.post('/reviews', redirectIfNotLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id)
    const review = await Review.create({
      ...req.body,
      author: user._id
    })

    const game = await Game.findById(req.body.game)

    game.reviews.push(review._id)
    game.save()

    user.reviews.push(review._id)
    user.save()

    res.json({
      message: 'Review created successfully!'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// Create Game
router.post('/games', redirectIfNotLoggedIn, async (req, res) => {
  try {
    await Game.create(req.body)

    res.json({
      message: 'Game created successfully!'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// Get All Games
router.get('/games', async (req, res) => {
  try {
    const games = await Game.find().populate('reviews')

    res.json(games)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// Get User Reviews
router.get('/reviews/user', async (req, res) => {
  try {
    const reviews = await Review.find({
      author: req.session.user_id
    }).populate('game')

    res.json(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

// Get All Reviews For Game
router.get('/game/reviews/:game_id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.game_id).populate('reviews')

    res.json(game.reviews)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router