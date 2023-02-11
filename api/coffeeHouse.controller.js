import coffeeHouseDAO from "./dao/coffeeHouseDAO.js"

export default class coffeeHouseCtrl{
    static async apiGetCoffeeHouse(req, res, next){
        const coffeeHousesPerPage = req.query.coffeeHousesPerPage ? parseInt(req.query.coffeeHousesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.name){
            filters.name = req.query.name
        }
        else if(req.query.price){
            filters.price = req.query.price
        }
        else if(req.query.location){
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
}