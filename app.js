import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import dotenv from 'dotenv'
import coffeeHouseCollection from './coffeeHouse.js'
import coffeeHouseRoutes from './api/coffeeHouse.route.js'
import coffeeHouseDAO from './api/dao/coffeeHouseDAO.js'
const port = process.env.PORT||3000
const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)

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

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname + '/public')); // to use html as the main view engine
// it means to extract all files from '/public' folder and save it to default path

/*
app.get('/', (req, res)=>{
    res.render('views/index')
})

app.get('/coffeeHouse', async (req, res) =>{
    const all = await CoffeeHouse.find({})
    res.render('views/index')
})

app.get('/newCoffeeHouse', async (req,res) => {
   
})*/

app.use('/api/v1/coffeeHouse', coffeeHouseRoutes) // set up routes

app.get('/api/v1/coffeeHouseGetAll', async (req, res) => {
    const all = await coffeeHouseCollection.find({})
    res.json({data: all});
    console.log("Returned all data.")
  });

app.use('*', (req, res) =>{ // '*' means going to a route not in our route file
    res.status(404).json({error: 'Not found.'})
}); 
  
app.listen(port, () => {
    console.log(`Listening on port ${port} now.`)
})