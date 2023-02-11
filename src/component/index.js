import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    fetch('/api/home') // fetch from Express.js server
     .then(response => {
      return response.json()}
      )
     .then(result => {
      const coffeeHouseInfo = result.data
    });

  render() (
    <div>
      <h1>Welcome to GeeksforGeeks</h1>
      <p>{coffeeHouseInfo}</p>
    </div>
  );
};
  
export default Home;