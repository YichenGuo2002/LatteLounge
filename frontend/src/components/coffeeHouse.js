import React, {useState, useEffect} from "react"
import CoffeeHouseDataService from "../services/coffeeHouse"
import {Link, useParams} from "react-router-dom"

const CoffeeHouse = (props) => {
  const initialCoffeeHouseState = {
    id: null,
    name:"",
    location:"",
    price:"",
    description:"",
    reviews:[]
  }

  const [coffeeHouse, setCoffeeHouse] = useState(initialCoffeeHouseState)
  const {id} = useParams()
  
  const getCoffeeHouse = (id) =>{
    CoffeeHouseDataService.get(id)
    .then(response =>{
      setCoffeeHouse(response.data[0])
      console.log("coffee house is set to", coffeeHouse)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  useEffect(() => {
    getCoffeeHouse(id)
  }, [id])

  const deleteReview = (reviewId, index) =>{
    CoffeeHouseDataService.deleteReview(reviewId, props.user.id)
    .then(response =>{
      setCoffeeHouse((prevState) => {
        prevState.reviews.splice(index, 1)
        return({
          ...prevState
        })
      })
    })
    .catch(e =>{
      console.log(e)
    })
  }

  return(
    <article className = "container mt-3">
      {coffeeHouse?(
        <div className="card mb-3">
        <img className="card-img-top max-height-image-article object-fit-cover" src={coffeeHouse.image_url} alt="Card cap"/>
        <div className="card-body">
          <h5 className="card-title">{coffeeHouse.name}</h5>
          <h5 className="card-subtitle mb-2 text-muted">{coffeeHouse.location}</h5>
          {coffeeHouse.phone == "N/A" ?(<></>):(
            <h5 className="card-subtitle mb-2 text-muted">{coffeeHouse.phone}</h5>
          )}
          <p className="card-text">Categories: {coffeeHouse.categories}</p>
          <p className="card-text">Price Range: {coffeeHouse.price}</p>
          <p className="card-text">Transactions: {coffeeHouse.transactions}</p>
          <Link to={"/coffeeHouse/"+id+"/review"} className="btn btn-primary">
          Add Review
          </Link>
          <a href={coffeeHouse.url} className="btn btn-primary m-1">Yelp Review</a>
          <p className = "card-text"> </p>
          <p className = "card-text">LatteLounge Reviews:</p>
          <div className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {coffeeHouse.reviews && coffeeHouse.reviews.length > 0? (
              coffeeHouse.reviews.map((review, index) => {
                return(
                  <div className = "col" key = {index}>
                    <div className="card border-primary mb-3">
                      <div className="card-header">{review.name}</div>
                        <div className="card-body  text-dark">
                          <p className="card-text">{review.text}</p>
                           <p className="card-text">Posted on {new Date(review.date).toUTCString()}</p>
                          {props.user && props.user.id === review.user_id &&
                            <div className = "row">
                              <a onClick = {() => deleteReview(review._id, index)} className = "btn btn-primary">Delete Review</a>
                              <Link
                              to={"/coffeeHouse/"+id+"/review"}
                              state={{currentReview: review}}
                              className = "btn btn-primary">Edit Review</Link>
                            </div>
                          }
                        </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className = "col-sm-4">
                <p className="card-text"> No reviews yet. Try post one!</p>
              </div>
            )}
          </div>
          <p className="card-text"><small className="text-muted">Review System Powered by LatteLounge</small></p>
        </div>
      </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </article>
  )
}

export default CoffeeHouse;