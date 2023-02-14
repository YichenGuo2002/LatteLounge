import ReviewDAO from "./dao/reviewDAO.js"

export default class reviewController{
    static async apiPostReview(req, res, next){
        try{
            const coffeeHouseId = req.body.coffee_house_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewDAO.addReview(
                coffeeHouseId,
                userInfo,
                review,
                date
            )
            res.json({status: "success"})
        }catch(e){
            console.log(e)
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date
            )
            
            let {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update review - user may not be original poster"
                )
            }

            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log("Delete review id ", reviewId, " from user id ", userId)
            const reviewResponse = await ReviewDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status: "success"})
        }catch(e){
            console.log("wrong")
            res.status(500).json({error: e.message})
        }
    }
}