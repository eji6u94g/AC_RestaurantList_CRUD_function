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
      Name: item.name,
      English_Name: item.name_en,
      Category: item.category,
      Image_Link: item.image,
      Address: item.location,
      Phone: item.phone,
      Google_Map: item.google_map,
      Rating: item.rating,
      Description: item.description
    })
  })

  console.log('Data is imported!')
})