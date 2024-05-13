const { model, Schema } = require('mongoose')

const gameSchema = new Schema({
  title: {
    type: String,
    required: [true, 'You must supply the title for the game']
  },
  platform: {
    type: String,
    required: [true, 'You must supply the platform for the game']
  },
  genre: {
    type: String,
    required: [true, 'You must supply the genre for the game']
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
})

const Game = model('Game', gameSchema);

module.exports = Game