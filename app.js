const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const CoffeeHouse = require('./coffeeHouse')

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

const app = express()

app.use(express.static(__dirname + '/public')); // to use html as the main view engine
// it means to extract all files from '/public' folder and save it to default path

app.get('/', (req, res)=>{
    res.render('views/index')
})

app.get('/coffeeHouse', async (req, res) =>{
    const all = await CoffeeHouse.find({})
    res.render('views/index')
})

app.get('/newCoffeeHouse', async (req,res) => {
   
})

app.listen(3000, () => {
    console.log('Listening on port 3000 now.')
})