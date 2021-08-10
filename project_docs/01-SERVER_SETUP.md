# Steps to create a server

1. Basic Initial Setup
2. Express and Routes in app.js
3. Mongoose and Models in server.js
4. Connect Database

---

## Basic Initial Setup

**Add this code to package.json**

```
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-import": "^2.17.2",
    "eslint-plugin-jsx-a11y": "^6.2.1",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-react": "^7.12.4",
    "prettier": "^1.17.0"
  },
  "engines": {
    "node": ">10.0.0"
  }
```

**Import express**

> `const express = require('express);`

**Create an express application**

> `app=express ();`

**Listen to the app**

> `app.listen(3000,()=>console.log('Listing to server on port 3000))`

**Install nodemon**

> `npm i -D nodemon`

**Import dotenv**

> `const dotenv = require('dotenv;);`

**Create a config.env**

**Define path to config.env**

> `dotenv.config({path:`\${\_\_dirname}/config.env`})`

**Create PORT as a config variable in config.env and from now on add all
environment variables in config.env**

> `PORT = process.env.PORT || 3000`

---

## Express and Routes in app.js

**Add express.json middleware**

`app.use(express.json());`

**Add static middleware**

> 'app.use(express.static(`${__dirname}/public/`))`

**Add Basic Route**

> `app.get("/", (req, res) => { res.status(200).json({ text: "Hello from hell" }); });`

OR `app.route('/').get((req, res) => { res.status(200).json({ text: "Hello from
hell" }); });

**Create routers, controllers, utils and models folder**

**Create one file per resource in routes, controllers and models**

**Create Workspace in Postman**

**Create a Collection for each resource in the Workspace**

**Add basic CRUD requests for each resource**

**Create methods in controllers for the resources**

> `exports.method = (req,res)=>{res.status(200).send()}`

**Create router methods for each router file**

```
const express = require('express');

const router = express.Router();

router.route('/').get(userController.getAllUsers)

module.exports = router;

```

**Import and use the router middleware in the main app file**

> `app.use('/users',userRouter)`

---

## Mongoose and Models in server.js

**Create server.js**

**Move all server related code from app.js to server.js**

**Export app from app.js**

> `module.exports = app`

**Import app in server.js**

> `const app=require(./app)`

**Create Schemas and model for each resource and export them**

```
{
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({name:String,age : Number})
const User = mongoose.model('User',userSchema);
module.exports = User;}
}
```

**Import the Models into relevant controllers**

> `const User = require('./models/userModel')`

---

## Connect Database

**Add Database credentials to config.env**

**Connect to database in server.js**

```
mongoose.connect(DB,{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false,
})
.then( console.log('DB is connected'));
```
