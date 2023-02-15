import React, {useState} from "react"
import CoffeeHouseDataService from "../services/coffeeHouse"
import {Link, useParams, useLocation} from "react-router-dom"

const AddReview = (props) => {
  let initialReviewState = ""
  const {id} = useParams()
  const location = useLocation()
  console.log(location)
  let editing = false

  if(location.state && location.state.currentReview){
    editing = true
    initialReviewState = location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (event) =>{
    setReview(event.target.value)
  }

  const saveReview = (event) =>{
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      coffee_house_id: id
    }

    event.preventDefault();
    if(editing){
      data.review_id = location.state.currentReview._id
      console.log(data)
      CoffeeHouseDataService.updateReview(data)
      .then(response =>{
        setSubmitted(true)
        console.log(response.data)
      })
      .catch(e =>{
        console.log(e)
      })
    }else{
      CoffeeHouseDataService.createReview(data)
      .then(response => {
        setSubmitted(true)
        console.log(response.data)
      })
      .catch(e =>{
        console.log(e)
      })
    }

  }
  return (
    <div>
      {props.user ? (
        <div className = "submit-form">
          {submitted?(
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/coffeeHouse/"+id}>
                Back to Coffee House
              </Link>
            </div>
          ):(
            <div>
              <form>
                <div className="form-group">
                <label 
                className="form-label" 
                htmlFor="textAreaExample">
                  { editing ? "Edit Review" : "Create Review" }</label>
                  <textarea 
                  className="form-control" 
                  id="textAreaExample" 
                  required
                  value={review}
                  onChange={handleInputChange}
                  rows="4"></textarea>
                </div>
                <button 
                type="submit" 
                onClick={saveReview}
                className="btn btn-primary">Submit</button>
              </form>
            </div>
          )}
      </div>
      ):(
        <div>
        Please log in.
      </div>
      )}
    </div>
  );
}

export default AddReview;
