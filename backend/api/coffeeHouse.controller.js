import coffeeHouseDAO from "./dao/coffeeHouseDAO.js"

export default class coffeeHouseCtrl{
    static async apiGetCoffeeHouse(req, res, next){
        const coffeeHousesPerPage = req.query.coffeeHousesPerPage ? parseInt(req.query.coffeeHousesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        if(req.query.price){
            filters.price = req.query.price
        }
        if(req.query.location){
            filters.location = req.query.location
        }

        const {coffeeHousesList, totalNumberCoffeeHouses} = await coffeeHouseDAO.getCoffeeHouses({
            filters,
            page,
            coffeeHousesPerPage
        })

        let response = {
            coffee_houses: coffeeHousesList,
            page: page,
            filters: filters,
            entries_per_page: coffeeHousesPerPage,
            total_results: totalNumberCoffeeHouses
        }
        res.json(response)
    }

    static async apiGetCoffeeHouseById(req, res, next){
        try{
            let id = req.params.id|| {} // req.params is something right after url and a slash
            //req.query is after the ? in the url
            //req.body is in the body of the request
            let coffeeHouse = await coffeeHouseDAO.getCoffeeHouseById(id)
            if(!coffeeHouse){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(coffeeHouse)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetCoffeeHouseByPrice(req, res, next){
        try{
            let price = await coffeeHouseDAO.getCoffeeHouseByPrice()
            res.json(price)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetCoffeeHouseBySizeR(req, res, next){
        try{
            let sizeR = parseInt(req.params.size) || 5
            let list = await coffeeHouseDAO.getCoffeeHouseRandom(sizeR)
            res.json(list)
        }catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
}