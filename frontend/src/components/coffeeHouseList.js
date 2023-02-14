import React, {useState, useEffect} from "react"
import CoffeeHouseDataService from "../services/coffeeHouse"
import {Link} from "react-router-dom"
import "../index.css"
import cafe from "../Cafe_de_Flore.jpg"

const CoffeeHouseList = (props) => {
  const [coffeeHouse, setCoffeeHouse] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchPrice, setSearchPrice] = useState("")
  const [price, setPrice] = useState(["All Price"])

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const onChangeSearchLocation = e => {
    const searchLocation = e.target.value
    setSearchLocation(searchLocation)
  }

  const onChangeSearchPrice = e =>{
    const searchPrice = e.target.value
    setSearchPrice(searchPrice)
  }

  const retrieveCoffeeHouse = () =>{
    CoffeeHouseDataService.getAll()
    .then(response =>{
      console.log( response.data)
      setCoffeeHouse(response.data.coffee_houses)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  const retrievePrice = () =>{
    CoffeeHouseDataService.getPrice()
    .then(response =>{
      setPrice(["All Price", ...response.data])
    })
    .catch(e =>{
      console.log(e)
    })
  }

  const refreshList = () =>{
    retrieveCoffeeHouse()
  }

  const find = (query, by) => {
    CoffeeHouseDataService.find(query, by)
    .then(response => {
      console.log(response.data)
      setCoffeeHouse(response.data.coffee_houses)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  const findByName = () => {
    find(searchName, "name")
  }

  const findByLocation = () =>{
    find(searchLocation, "location")
  }

  const findByPrice = () =>{
    if (searchPrice === "All Price"){
      refreshList()
    }else{
      find(searchPrice, "price")
    }
  }

  const cardDeckWrapper = () =>{
   const cardDeck = coffeeHouse?.map((eachCoffeeHouse, index) => {
      return(
        <div className = "col" key = {index}>
          <div className="card h-100 border-primary dark mb-3">
        <img className="card-img-top" src={cafe} alt="Card cap"/>
          <div className="card-body text-dark">
        <h5 className="card-title">{eachCoffeeHouse.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{eachCoffeeHouse.location}</h6>
        <p className="card-text">Description: {eachCoffeeHouse.description}</p>
        <p className="card-title">Price Range: {eachCoffeeHouse.price}</p>
        <Link to={"/coffeeHouse/"+eachCoffeeHouse._id} className="btn btn-primary">
          View Reviews
        </Link>
      </div>
    </div>
    </div>
      )
    })
    return cardDeck
  }

  useEffect(() => {
    retrieveCoffeeHouse()
    retrievePrice()
  }, [])

  return (
<div>
<div className="input-group">
  <input 
  type="text" 
  className="form-control"
  value={searchName}
  placeholder="Name"
  onChange={onChangeSearchName}/>
  <div className="input-group-append">
    <button className="btn btn-outline-primary" onClick={findByName} type="button">Search by Name</button>
  </div>
</div>
<div className="input-group">
  <input 
  type="text" 
  className="form-control"
  value={searchLocation}
  placeholder="Location"
  onChange={onChangeSearchLocation}/>
  <div className="input-group-append">
    <button className="btn btn-outline-primary" onClick={findByLocation} type="button">Search by Location</button>
  </div>
</div>
<div className="input-group mb-3">
  <select className="form-select" aria-label="Default select example" onChange = {onChangeSearchPrice}>
  {price.map((eachPrice, index) =>{
    return (<option value = {eachPrice.toString()} key={index}>{eachPrice.toString()}</option>)
  })}
</select>
<div className="input-group-append">
    <button className="btn btn-outline-primary" onClick={findByPrice} type="button">Search by Price</button>
  </div>
</div>

<div className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

    {cardDeckWrapper()}

</div>

    </div>
  );
}

export default CoffeeHouseList;