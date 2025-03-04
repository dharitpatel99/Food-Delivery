const express = require('express');
const {getAllRestaurant,getRestaurantById,addRestaurant,updateRestaurant,deleteRestaurant} = require('../controllers/restaurantController')

//express router
const router = express.Router();

router.get('/get',getAllRestaurant);
router.get('/get/:id',getRestaurantById);
router.post('/add',addRestaurant);
router.put('/update/:id',updateRestaurant);
router.delete('/delete/:id',deleteRestaurant);

module.exports = router;
