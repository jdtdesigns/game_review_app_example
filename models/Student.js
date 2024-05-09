const { model, Schema } = require('mongoose')

const studentSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
})

const Student = model('Student', studentSchema);

module.exports = Student