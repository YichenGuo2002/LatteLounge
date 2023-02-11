import mongoose from 'mongoose'
const Schema = mongoose.Schema

const coffeeHouseSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String,
    review: String
})
export default mongoose.model('CoffeeHouse', coffeeHouseSchema)
