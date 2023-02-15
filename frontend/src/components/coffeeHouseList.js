import React, {useState, useEffect} from "react"
import CoffeeHouseDataService from "../services/coffeeHouse"
import {Link} from "react-router-dom"
import "../index.css"
import cafe from "../Cafe_de_Flore.jpg"
import paginateResult from "../services/pagination"

const CoffeeHouseList = (props) => {
  const [coffeeHouse, setCoffeeHouse] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchPrice, setSearchPrice] = useState("")
  const [page, setPage] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [query, setQuery] = useState({})
  const [price, setPrice] = useState(["All Price"])

  const onChangeSearchName = e => {
    const newSearchName = e.target.value
    setSearchName(newSearchName)
  }

  const onChangeSearchLocation = e => {
    const newSearchLocation = e.target.value
    setSearchLocation(newSearchLocation)
  }

  const onChangeSearchPrice = e =>{
    const newSearchPrice = e.target.value
    setSearchPrice(newSearchPrice)
  }

  const retrieveCoffeeHouse = () =>{
    CoffeeHouseDataService.getAll()
    .then(response =>{
      console.log(response.data)
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

  const find = (page = 0) => {
    console.log("Find ", query)
    CoffeeHouseDataService.find(query, page)
    .then(response => {
      console.log(response.data)
      setCoffeeHouse(response.data.coffee_houses)
      setPage(response.data.page)
      setTotalResults(response.data.total_results)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  const findBy = () => {
    const newQuery = {}
    if(searchName) newQuery.name = searchName
    if(searchLocation) newQuery.location = searchLocation
    if (searchPrice && searchPrice !== "All Price"){
      newQuery.price = searchPrice
    }
    setQuery(newQuery)
  }

  const cardDeckWrapper = () => {
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
    </div>)
    })
    return cardDeck
  }

  const setPagination = () => {
    let result = paginateResult(totalResults, page)
  }

  useEffect(() => {
    retrieveCoffeeHouse()
    retrievePrice()
  }, [])

  useEffect(() =>{
    find()
  }, [query])

  return (
    <body className = "container mt-3">
<div className="input-group">
  <input 
  type="text" 
  className="form-control"
  value={searchName}
  placeholder="Name"
  onChange={onChangeSearchName}/>
</div>
<div className="input-group">
  <input 
  type="text" 
  className="form-control"
  value={searchLocation}
  placeholder="Location"
  onChange={onChangeSearchLocation}/>
</div>
<div className="input-group mb-3">
  <select className="form-select" aria-label="Default select example" onChange = {onChangeSearchPrice}>
  {price.map((eachPrice, index) =>{
    return (<option value = {eachPrice.toString()} key={index}>{eachPrice.toString()}</option>)
  })}
</select>
</div>
<div className="input-group mb-3">
    <button className="btn btn-outline-primary" onClick={findBy} type="button">Filter</button>
  </div>

<div className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

    {cardDeckWrapper()}


</div>

<div className = "container mt-3">
  <nav aria-label="Page navigation example">
    <ul className="pagination justify-content-center text-center align-middle">
      <li className="page-item disabled">
        <a className="page-link">Previous</a>
      </li>
      <li className="page-item"><a className="page-link" href="#">1</a></li>
      <li className="page-item"><a className="page-link" href="#">2</a></li>
      <li className="page-item"><a className="page-link" href="#">3</a></li>
      <li className="page-item">
        <a className="page-link" href="#">Next</a>
      </li>
      <li className="page-item disabled"><a className="page-link" >We are at page {page}</a></li>
    </ul>
  </nav>
</div>
    </body>
  );
}

export default CoffeeHouseList;