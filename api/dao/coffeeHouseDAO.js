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
    let strictQuery
    if(filters){ // Mongodb queries
        if('name' in filters){
            query = {$text: {$search: filters['name']}}
        }
        else if('price' in filters){
            query = {$text: {$eq: filters['price']}}
        }
        else if('location' in filters){
            query = {$text: {$search: filters['location']}}
        }
    }

    let cursor
    try{
        cursor = await coffeeHouses.find(query)
    }catch(e){
        console.error(`Unable to issue find command, ${e}`)
        return {coffeeHousesList: [], totalNumberCoffeeHouses: 0}
    }
    const displayCursor = cursor.limit(coffeeHousesPerPage).skip(coffeeHousesPerPage * page)
   
    try{
        const coffeeHousesList = await displayCursor.toArray()
        const totalNumberCoffeeHouses = await coffeeHouses.countDocuments(query)
        return {coffeeHousesList, totalNumberCoffeeHouses}
    } catch(e){
        console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
        return {coffeeHousesList: [], totalNumberCoffeeHouses: 0}
    }
   }
}
