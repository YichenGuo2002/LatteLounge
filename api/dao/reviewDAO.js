import mongodb from "mongodb"
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
}