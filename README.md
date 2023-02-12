{
	"coffee_house_id":"63e7cf00e6009535e5c0f5e2",
	"text": "This coffee shop has it all. The ambiance, interior designs, good coffee, tasty foods, and fast wi-fi connection. Prices are a bit high but once you already taste it, you understand why.",
	"user_id": "ke1982",
	"name": "Eunive Kim"
}

const [user, setUser] = React.useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }


<div className = "container mt-3">
        <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/coffeeHouse">LatteLounge</a>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <Link to={"/coffeeHouse"} class="nav-link">Find the Café</Link>
          </li>
          <li class="nav-item">
            {user ? (
              <a onClick = {logout} className = "nav-link">
                Logout {user.name}
              </a>
            ):(
              <Link to={'/login'} class="nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        </div>
      </nav>

      <div className = "container mt-3">
        <Routes>
              <Route exact path = {["/", "/coffeeHouse"]} component = {CoffeeHouseList}/>
                <Route
                path = "/coffeeHouse/:id/review"
                render={(props) => (
                  <AddReview {...props} user={user} />
                )}
                />  
              <Route
                path = "/coffeeHouse/:id"
                render={(props) => (
                  <CoffeeHouse {...props} user={user} />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} login={login} />
                )}
              />
        </Routes>
      </div>
    </div>