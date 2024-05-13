const { model, Schema } = require('mongoose')

const reviewSchema = new Schema({
  text: {
    type: String,
    required: [true, 'You must supply the text for the review']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'A review can only have a minimum value of 1'],
    max: [10, 'A review can only have a max value of 10']
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Review = model('Review', reviewSchema)

module.exports = Review