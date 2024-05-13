const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3333

const db = require('./config/client')

const session = require('express-session')
const MongoStore = require('connect-mongo');

const view_routes = require('./routes/view_routes')
const auth_routes = require('./routes/auth_routes')
const api_routes = require('./routes/api_routes')

app.use(express.json())

app.use(express.static('public'))

// Apply Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ client: db.client }),
  // cookie: { secure: true }
}))

// Load Routes
app.use('/', [
  view_routes
])

app.use('/api/auth', auth_routes)
app.use('/api', api_routes)

db.connection.once('open', () => {
  console.log('DB connected')

  app.listen(PORT, () => console.log('Server started on port', PORT))
})