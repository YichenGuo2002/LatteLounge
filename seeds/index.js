const mongoose = require('mongoose')
const CoffeeHouse = require('../coffeeHouse')
const {cities, coffeeHouseNames, coffeeHouseReviews, coffeeHouseDescriptions} = require('./seeds')

mongoose.set('strictQuery', true); // make sure only instances of Schema model can be saved
mongoose.connect('mongodb://localhost:27017/coffee-house')
//mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection
db.on('error', () =>{
    console.error.bind(console, 'connection error:')
})
db.once('open', () =>{
    console.log('Database connected.')
})

const seedDB = async() =>{
    await CoffeeHouse.deleteMany({}) // delete all instances
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 4 + 1)
        const priceString = "";
        for (z = 1; z <= price; z++){
            priceString += "$"
        }
        
        const c = new CoffeeHouse({
            name: `${coffeeHouseNames[i]}`,
            price: `${priceString}`,
            description: `${coffeeHouseDescriptions[i]}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            review:`${coffeeHouseReviews[i]}`
        })
        await c.save()
    }
}
seedDB()