import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let coffeeHouses

export default class coffeeHouseDAO{
   static async injectDB(coffeeHouseCollection){
        if(coffeeHouses){
            return
        }
        try{
            coffeeHouses = await coffeeHouseCollection
        }catch(e){
            console.error(`Unable to establish a collection handle in restaurantDAO: ${e}`)
        }
   } 

   static async getCoffeeHouses({
    filters = null,
    page = 0,
    coffeeHousesPerPage = 20
   } = {}){
    let query = {}
    if(filters){ // Mongodb queries
        if(filters['name']){
            query['$search'] = {
                index: "name",
                text: {
                  query: filters['name'],
                  path: "name"
                }
            }
        }
        if(filters['price']){
            query['price'] = {$eq: filters['price']}
        }
        if(filters['location']){
            query['$text'] = {$search: filters['location']}
        }
    }

    let cursor
    
    try{
        console.log(JSON.stringify(query))
        cursor = await coffeeHouses
        .find(query).limit(coffeeHousesPerPage).skip(coffeeHousesPerPage * page)
    } catch(e){
        console.error(`Unable to issur find command, ${e}`)
        return {coffeeHousesList: [], totalNumberCoffeeHouses: 0}
    }

    try{
        const coffeeHousesList = [...cursor] // save all returned results in array
        const totalNumberCoffeeHouses = await coffeeHouses.countDocuments(query)
        return {coffeeHousesList, totalNumberCoffeeHouses}
    } catch(e){
        console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
        return {coffeeHousesList: [], totalNumberCoffeeHouses: 0}
    }
   }

   static async getCoffeeHouseById(id){
    try{
        const pipeline = [
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup:{
                    from: "reviews",
                    let:{
                        id:"$_id"
                    },
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $eq: ["$coffee_house_id", "$$id"]
                                }
                            }
                        },
                        {
                            $sort:{
                                date:-1
                            }
                        }
                    ],
                    as: "reviews"
                }
            },
            {
                $addFields:{
                    reviews:"$reviews"
                }
            }
        ]
        return await coffeeHouses.aggregate(pipeline)
    }catch(e){
        console.log(`Something went wrong in getCoffeeHouseById: ${e}`)
        throw(e)
    }
   }

   static async getCoffeeHouseByPrice(){
    let price = []
    try{
        price = await coffeeHouses.distinct("price")
        return price
    }catch(e){
        console.log(`Something went wrong in get coffee house by prices: ${e}`)
        return price
    }
   }
}

