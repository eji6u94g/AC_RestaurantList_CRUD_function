const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const routes = require('./routes/index.js')
const app = express()
const port = 3000
const dbConnection = mongoose.connection

//handlebar helper and setting
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    formRenderHelper: function (object) {
      delete object._id
      delete object.__v
    }
  }
}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//set mongoose
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
dbConnection.on('error', () => {
  console.log('Mongodb error!')
})
dbConnection.once('open', () => {
  console.log('Mongodb is connected!')
})

//set body-parser
app.use(express.urlencoded({ extended: true }))

//set method override
app.use(methodOverride('_method'))

//set routes
app.use(routes)

app.listen(port, () => {
  console.log('online')
})