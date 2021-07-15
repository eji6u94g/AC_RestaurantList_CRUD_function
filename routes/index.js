const express = require('express')
const router = express.Router()
const home = require('./modules/home.js')
const restaurants = require('./modules/restaurants.js')

//Index page
router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router