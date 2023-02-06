const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coffeeHouseSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String,
    review: String
})
module.exports = mongoose.model('CoffeeHouse', coffeeHouseSchema)