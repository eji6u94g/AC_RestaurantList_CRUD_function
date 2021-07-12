const mongoose = require('mongoose')
const restaurantData = require('../restaurant.js')
const dbConnection = mongoose.connection
const restaurantList = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
dbConnection.on('error', () => {
  console.log('Mongodb error!')
})
dbConnection.once('open', () => {
  console.log('Mongodb is connected!')
  restaurantList.results.forEach(item => {
    restaurantData.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })

  console.log('Data is imported!')
})