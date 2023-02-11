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
            query = {'name':{$eq: filters['name']}}
        }
        else if(filters['price']){
            query = {'price': {$eq: filters['price']}}
        }
        else if(filters['location']){
            query = {$text: {$search: filters['location']}}
        }
    }

    let cursor
    
    try{
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
}

