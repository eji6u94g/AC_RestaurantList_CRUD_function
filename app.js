const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => item.name.trim().toLowerCase().includes(keyword.trim().toLowerCase()) || item.category.trim().toLowerCase().includes(keyword.trim().toLowerCase()))
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log('online')
})