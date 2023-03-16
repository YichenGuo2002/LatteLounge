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

const fetchYelp = async(location) =>{
    return await fetch('https://api.yelp.com/v3/businesses/search?' + new URLSearchParams({
        location: location,
        term: 'coffee',
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

const processYelp = async(location) =>{
    const resultYelp = await fetchYelp(location)
    console.log('trying')
    for(const businessKey in resultYelp.businesses){
        console.log(resultYelp.businesses[businessKey])
    }
}

const seedDB = async(location) =>{
    await coffeeHouseCollection.deleteMany({}) // delete all instances
    const resultYelp = await fetchYelp(location)

    for(const businessKey in resultYelp.businesses){
        let business = resultYelp.businesses[businessKey]
        let categoryDescription = ""
        let price = ""
        let locationDescription = ""
        let phone = ""
        let transactionDescription = business.transactions.reduce((accumulator, type) => {
            return accumulator + type + " "
        }, "dine-in ")
        transactionDescription = transactionDescription.slice(0, transactionDescription.length - 1)
        for(const categoryKey in business.categories){
            let category = business.categories[categoryKey]
            categoryDescription += category.title + ", "
        }
        if(categoryDescription[categoryDescription.length - 2] == ","){
            categoryDescription = categoryDescription.slice(0, categoryDescription.length - 2) + '.'
        }
        for(const locationKey in business.location.display_address){
            let location = business.location.display_address[locationKey]
            if(location){
                locationDescription += location + ", "
            }
        }
        if(locationDescription[locationDescription.length - 2] == ","){
            locationDescription = locationDescription.slice(0, locationDescription.length - 2) + '.'
        }
        if(business.price){
            price = business.price
        }else{
            price = "N/A"
        }
        if(business.display_phone){
            phone = business.display_phone
        }else if(business.phone){
            phone = business.phone
        }else{
            phone = 'N/A'
        }

        const newCoffeeHouse = new coffeeHouseCollection({
            name: `${business.name}`,
            price: `${price}`,
            categories: `${categoryDescription}`,
            location: `${locationDescription}`,
            review:`${business.rating} (${business.review_count})`,
            image_url:`${business.image_url}`,
            phone: `${phone}`,
            yelp_id: `${business.id}`,
            transactions: `${transactionDescription}`,
            url: `${business.url}`
        })
        console.log(business.image_url)
        await newCoffeeHouse.save()
    }   
}

// await processYelp('Times Square')
await seedDB('Times Square')