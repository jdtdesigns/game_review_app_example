const { model, Schema } = require('mongoose')

const courseSchema = new Schema({
  university: {
    type: String,
    required: true
  },
  course_type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Course = model('Course', courseSchema)

module.exports = Course