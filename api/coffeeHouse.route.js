import express from 'express'
import coffeeHouseCtrl from "./coffeeHouse.controller.js"

const router = express.Router()

router.route('/').get(coffeeHouseCtrl.apiGetCoffeeHouse)

export default router

