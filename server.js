const express = require('express')

const app = express()
const PORT = process.env.PORT || 3333

const client = require('./config/client')

const Student = require('./models/Student')
const Course = require('./models/Course')

app.use(express.json())

// Get All Students
app.get('/api/students', async (req, res) => {
  const students = await Student.find().populate('courses')

  res.json(students)
})

// Create/Add a Student
app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body)

    res.json(student)
  } catch (error) {
    console.log(error.errors)

    res.json({
      message: 'Validation Error. Please ensure all required fields have been entered'
    })
  }
})

// SHOW THE FINDONEANDUPDATE
// Add a course to a student
app.put('/api/course/:student_id', async (req, res) => {
  const student = await Student.findById(req.params.student_id)

  let course = await Course.findOne({
    name: req.body.name,
    university: req.body.university
  })

  if (!course) course = await Course.create(req.body)

  student.courses.push(course._id)

  // Triggers the change/update in the database
  student.save()

  res.json(student)
})

client.once('open', () => {
  console.log('DB connected')

  app.listen(PORT, () => console.log('Server started on port', PORT))
})