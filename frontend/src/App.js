import React from "react"
import {Routes, Route, Link, useParams} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/src/collapse.js";

import AddReview from "./components/addReview"
import CoffeeHouseList from "./components/coffeeHouseList"
import CoffeeHouse from "./components/coffeeHouse"
import Login from "./components/login"

function App() {
  const [user, setUser] = React.useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  const AddReviewWrapper = () => {
    const { user } = useParams();
    return <AddReview user={user} />;
  };

  const CoffeeHouseWrapper = () => {
    const { user } = useParams();
    return <CoffeeHouse user={user} />;
  };

  const LoginWrapper = () => {
    const { login } = useParams();
    return <Login login={login} />;
  };

  return (
    <div>
      <nav className ="navbar navbar-expand-lg bg-primary-subtle">
  <div className ="container-fluid">
    <a className ="navbar-brand" href="/coffeeHouse">LatteLounge</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className ="navbar-nav me-auto mb-2 mb-lg-0">
        <li className ="nav-item">
          <Link className ="nav-link" aria-current="page" to={"/coffeeHouse"}>
          Find the Café
          </Link>
        </li>
        <li className ="nav-item">
          {user? (
            <a onClick = {logout} className ="nav-link">
              Logout from {user.name}
            </a>
          ) : (
            <Link to = {"/login"} className ="nav-link">
              Write a Review
            </Link>
          )}
        </li>
      </ul>
      <form className ="d-flex" role="search">
        <input className ="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className ="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

      <div className = "container mt-3">
        <Routes>
              <Route exact path = "/" element = {<CoffeeHouseList />}/>
              <Route exact path = "/coffeeHouse" element = {<CoffeeHouseList/>}/>
              <Route
                path = "/coffeeHouse/:id/review"
                element={<AddReview/>}
                />  
              <Route
                path = "/coffeeHouse/:id"
                element={<CoffeeHouseWrapper/>}
              />
              <Route
                path="/login"
                element={<LoginWrapper/>}
              />
        </Routes>
      </div>
    </div>
  );
}

export default App;
