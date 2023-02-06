const mongoose = require('mongoose')
const CoffeeHouse = require('../coffeeHouse')

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
    await CoffeeHouse.deleteMany({})
    const c = new CoffeeHouse({name: 'dream'})
    await c.save()
}
seedDB()