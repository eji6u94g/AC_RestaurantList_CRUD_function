const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  "Name": {
    type: String,
    required: true
  },
  "English_Name": {
    type: String,
    required: true
  },
  "Category": {
    type: String,
    required: true
  },
  "Image_Link": {
    type: String,
    required: false
  },
  "Address": {
    type: String,
    required: true
  },
  "Phone": {
    type: String,
    required: true
  },
  "Google_Map": {
    type: String,
    required: false
  },
  "Rating": {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  "Description": {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('restaurant_data', restaurantSchema)