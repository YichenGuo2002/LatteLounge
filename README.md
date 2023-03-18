# :coffee: LatteLounge

<a href="https://my-campground.herokuapp.com/">
 <p align="center">
  <img src="https://github.com/YichenGuo2002/LatteLounge/blob/main/frontend/public/presentation.png?raw=true" alt="LatteLounge"/>
 </p>
</a>

LatteLounge is a website where users can browse and post reviews about local coffee houses. It also features individualized recommendation based on your preferences. In order to review or modify previous posts, you must first log in to your account.

This project was created using Node.js, Express, MongoDB, React.js, Python Scikit Learn, Axios and Bootstrap. Jw-pagination.js was used to create pagination. Yelp API was used to fetch nationwide coffee house data.

## Features
* Users can create, edit, and remove coffee house revies
* Clear coffee house information page with address, phone number, price range, product categories, and transaction types allowed there
* Individualized user recommendation based on Scikit Learn
* Search campground by name, location, and price range
* Direct ink to yelp coffee house page

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone https://github.com/leovenom/YelpCamp.git
cd YelpCamp
npm install
```
## Built With

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - The database for
  modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [ejs](https://ejs.co/) - Embedded JavaScript templating

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

To get google maps working check [this](https://github.com/nax3t/google-maps-api) out.