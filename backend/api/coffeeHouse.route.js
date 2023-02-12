import express from 'express'
import coffeeHouseCtrl from "./coffeeHouse.controller.js"
import reviewCtrl from "./review.controller.js"

const router = express.Router()

router.route('/').get(coffeeHouseCtrl.apiGetCoffeeHouse)

router
.route("/review")
.post(reviewCtrl.apiPostReview)
.put(reviewCtrl.apiUpdateReview)
.delete(reviewCtrl.apiDeleteReview)

router.route("/id/:id").get(coffeeHouseCtrl.apiGetCoffeeHouseById)
router.route("/price").get(coffeeHouseCtrl.apiGetCoffeeHouseByPrice)

export default router

