const express = require('express')
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const restaurantData = require('./models/restaurant.js')
const app = express()
const port = 3000
const dbConnection = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
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

//Index page
app.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  restaurantData.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

function restaurantsMatchKeyword(restaurant, keyword) {
  return restaurant.name.trim().toLowerCase().includes(keyword) || restaurant.category.trim().toLowerCase().includes(keyword)
}

//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  restaurantData.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => restaurantsMatchKeyword(restaurant, keyword))
      res.render('index', { restaurants, keyword: req.query.keyword })
    })
})

app.listen(port, () => {
  console.log('online')
})