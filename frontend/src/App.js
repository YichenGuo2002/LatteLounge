import React from "react"
import {Routes, Route, Link, useParams} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js'

import AddReview from "./components/addReview"
import CoffeeHouseList from "./components/coffeeHouseList"
import CoffeeHouse from "./components/coffeeHouse"
import Login from "./components/login"
import Home from "./components/home"
import logo from "./logo.png"

function App() {
  const [user, setUser] = React.useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  const AddReviewWrapper = () => {
    return <AddReview user={user} />;
  };

  const CoffeeHouseWrapper = () => {
    return <CoffeeHouse user={user} />;
  };

  const LoginWrapper = () => {
    return <Login login={login} />;
  };

  return (
    <div>
      <nav className ="navbar navbar-expand-lg bg-primary-subtle">
  <div className ="container-fluid">
    <a href = {"/"}><img src={logo} width="40" height="40" class="d-inline-block" alt="Logo"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className ="navbar-nav me-auto mb-2 mb-lg-0">
        <li className ="nav-brand">
          <Link className ="nav-link" aria-current="page" to={"/"}>
          LatteLounge
          </Link>
        </li>
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

        <Routes>
              <Route exact path = "/" element = {<Home />}/>
              <Route exact path = "/coffeeHouse" element = {<CoffeeHouseList/>}/>
              <Route
                path = "/coffeeHouse/:id/review"
                element={<AddReviewWrapper/>}
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

      <footer className="text-dark text-center border-top" style={{backgroundColor:"rgba(0, 0, 0, 0.025)"}}>
        <div className="container p-4 pb-0">
        <section className="mb-4">
        <p>
        Sip, Share, and Discover the Best Brews with <strong>LatteLounge</strong> - Your Ultimate Coffee Companion!
        </p>
      </section>

          <section>
            <form>
              <div className="row d-flex justify-content-center">
              
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input type="email" id="form5Example29" className="form-control" placeholder = "Email Address"/>
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4 border-dark text-dark">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.25)"}}>
          © 2023 Copyright: <a href="https://www.yichenguo.com/" style={{textDecoration:"none"}}>Yichen Guo</a>. 
          [<a href="https://www.yichenguo.com/" style={{textDecoration:"none"}}>Github</a>] 
          [<a href="https://www.yichenguo.com/" style={{textDecoration:"none"}}>LinkedIn</a>]
        </div>
      </footer>
    </div>
  );
}

export default App;
