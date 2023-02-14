import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Login = (props) => {

  const initialUserState = {
    name: "",
    id: "",
  }

  const [user, setUser] = useState(initialUserState)
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    let {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const loginFunc = () =>{
    props.login(user)
    navigate('/')
  }

  return (
    <div className="App">
      <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputName">First Name</label>
          <input type="text" 
          className="form-control" 
          id="inputName" 
          name="name" 
          value={user.name}
          onChange={handleInputChange}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password"
         className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="id"
          onChange={handleInputChange}
          />
      </div>
      <button type="submit" className="btn btn-primary" onClick={loginFunc}>Login</button>
    </form>
    </div>
  );
}

export default Login;