const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurant.js')

//Index page
router.get('/', (req, res) => {
  restaurantData.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router