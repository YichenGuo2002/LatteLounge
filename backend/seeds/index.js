// run this file to seed instances. Don't run it after running it, because it will delete all other instances.
import mongoose from 'mongoose' 
import {coffeeHouseCollection, reviewCollection} from '../coffeeHouse.js'
import dotenv from 'dotenv'
dotenv.config()
import {cities, coffeeHouseNames, coffeeHouseReviews, coffeeHouseDescriptions} from './seeds.js'
import fetch from "node-fetch"

mongoose.set('strictQuery', true); // make sure only instances of Schema model can be saved
//mongoose.connect('mongodb://localhost:27017/coffee-house')
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection
db.on('error', () =>{
    console.error.bind(console, 'connection error:')
})
db.once('open', () =>{
    console.log('Database connected.')
})

const fetchYelp = async() =>{
    return await fetch('https://api.yelp.com/v3/businesses/search?' + new URLSearchParams({
        location: 'NYC',
        term: 'cafe',
        limit: 50
    }), {
        // Adding method type
        method: "GET",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer pGqnBgaz8q0mg75qoRCegoTOcCY5xzK1TibhYZsDCUJ0E-NQa9M1iEhbOtakpR5b1XJcyych1mdtgEZKwodiNKNpEPpD76hPfUcdeCRolGjfVfKXBTwAHKh0eUTuY3Yx'
        }
        })
        // Converting to JSON
        .then((response) => {
            return response.json()
        }).then((data) =>{
            return data
        })
}

const processYelp = async() =>{
    const resultYelp = await fetchYelp()
    console.log('trying')
    for(const businessKey in resultYelp.businesses){
        console.log(resultYelp.businesses[businessKey])
    }
}

const seedDB = async() =>{
    await coffeeHouseCollection.deleteMany({}) // delete all instances
    const resultYelp = await fetchYelp()

    for(const businessKey in resultYelp.businesses){
        let business = resultYelp.businesses[businessKey]
        let categoryDescription = ""
        let price = ""
        for(const categoryKey in business.categories){
            let category = business.categories[categoryKey]
            categoryDescription += category.title + ", "
        }
        if(categoryDescription[categoryDescription.length - 2] == ","){
            categoryDescription = categoryDescription.slice(0, categoryDescription.length - 2) + '.'
        }
        if(business.price){
            price = business.price
        }else{
            price = "N/A"
        }

        const newCoffeeHouse = new coffeeHouseCollection({
            name: `${business.name}`,
            price: `${price}`,
            description: `${categoryDescription}`,
            location: `${business.phone}`,
            review:`${business.rating}`,
            image_url:`${business.image_url.replaceAll("/", "&#x2f;")}`
        })
        console.log(business.image_url.replaceAll("/", "&#x2f;"))
        await newCoffeeHouse.save()
    }   
}

await processYelp()