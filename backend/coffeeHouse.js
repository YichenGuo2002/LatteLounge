import mongoose from 'mongoose'
const Schema = mongoose.Schema

const coffeeHouseSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String,
    review: String
})

const reviewSchema = new Schema({
    name:String,
    user_id:String,
    date:Date,
    text:String,
    coffee_house_id:{type:Schema.Types.ObjectId, ref: 'CoffeeHouse'}
})

export const coffeeHouseCollection = mongoose.model('CoffeeHouse', coffeeHouseSchema)
export const reviewCollection = mongoose.model('Review', reviewSchema)


