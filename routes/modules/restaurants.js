const express = require('express')
const router = express.Router()
const restaurantData = require('../../models/restaurant.js')

//Add item
router.get('/new', (req, res) => {
  restaurantData.findOne()
    .lean()
    .then(restaurant => res.render('new', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const Name = req.body.Name
  const English_Name = req.body.English_Name
  const Category = req.body.Category
  const Image_Link = req.body.Image_Link
  const Address = req.body.Address
  const Phone = req.body.Phone
  const Google_Map = req.body.Google_Map
  const Rating = req.body.Rating
  const Description = req.body.Description
  restaurantData.create({
    Name,
    English_Name,
    Category,
    Image_Link,
    Address,
    Phone,
    Google_Map,
    Rating,
    Description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//show detail page
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  restaurantData.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//search
function restaurantsMatchKeyword(restaurant, keyword) {
  return restaurant.name.trim().toLowerCase().includes(keyword) || restaurant.category.trim().toLowerCase().includes(keyword)
}
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  restaurantData.find()
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => restaurantsMatchKeyword(restaurant, keyword))
      res.render('index', { restaurants, keyword: req.query.keyword })
    })
})

//edit item
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  restaurantData.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const Name = req.body.Name
  const English_Name = req.body.English_Name
  const Category = req.body.Category
  const Image_Link = req.body.Image_Link
  const Address = req.body.Address
  const Phone = req.body.Phone
  const Google_Map = req.body.Google_Map
  const Rating = req.body.Rating
  const Description = req.body.Description
  const id = req.params.restaurant_id
  restaurantData.findById(id)
    .then(restaurant => {
      restaurant.Name = Name
      restaurant.English_Name = English_Name
      restaurant.Category = Category
      restaurant.Image_Link = Image_Link
      restaurant.Address = Address
      restaurant.Phone = Phone
      restaurant.Google_Map = Google_Map
      restaurant.Rating = Rating
      restaurant.Description = Description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete item
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  restaurantData.findById(id)
    .then(restaurant => {
      restaurant.remove()
      res.redirect('/')
    })
    .catch(error => console.log(error))
})

module.exports = router