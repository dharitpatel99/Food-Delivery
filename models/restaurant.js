const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    restName:{
        type:String,
        required:[true,"Restaurant Name is Required"],
        trim:true
    },
    cuisine:[{
        type:String,
        required:[true,"Cuisine is Required"],
        trim:true  
    }],
    rating:{
        average:{
            type:Number,
            default:0,
            min:0,
            max:5
            },
        totalReview:{
            type:Number,
            default:0
        }
    }   ,
    createdAt:{
        type:Date,
        default:Date.now()
    } 
})

const Restaurant = mongoose.model('Restaurant',RestaurantSchema)

module.exports = Restaurant;