import mongodb from "mongodb"
import { reviewCollection } from "../../coffeeHouse.js"
const ObjectId = mongodb.ObjectID

let reviews 

export default class ReviewDAO{
    static async injectDB(reviewCollection){
        if(reviews){
            return
        }
        try{
            reviews = await reviewCollection
        }catch(e){
            console.error(`Unable to establish a collection handle in reviewDAO: ${e}`)
        }
   } 

   static async addReview(coffeeHouseId, user, review, date){
    try{
        const reviewDoc = new reviewCollection({
            name:user.name,
            user_id: user._id,
            date:date,
            text:review,
            coffee_house_id: ObjectId(coffeeHouseId)
        })
        return await reviewDoc.save()
    }catch(e){
        console.error(`Unable to post review: ${e}`)
        return {error:e}
    }
   }

   static async updateReview(reviewId, userId, text, date){
    try{
        const updateResponse = await reviews.updateOne(
            {user_id: userId, _id: ObjectId(reviewId)},
            {$set: {text:text, date:date}}
            )
        return updateResponse
    }catch(e){
        console.log('No')
        console.error(`Unable to update review: ${e}`)
        return {error:e}
    }
   }

   static async deleteReview(reviewId, userId){
    try{
        const deleteResponse = await reviews.deleteOne({
            _id: ObjectId(reviewId),
            user_id: userId
        })
        return deleteResponse
    }catch(e){
        console.error(`Unable to delete review: ${e}`)
        return {error:e}
    }

    
   }
}