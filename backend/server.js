//Requiring Packages
const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
require('dotenv').config()
const bodyParser = require('body-parser')
//Requiring Routes
const userRouter = require('./router/userRouter');





const login  = require('../backend/router/loginRouter')

//DataBase Connection
const uri = process.env.MongoDB;
mongoose.connect(uri)
    .then(() => {console.log(`Connected To MongoDB`)})
    .catch((err)=>{console.log(`${err}Couldnt Connected To MongoDB`)})
//Server Connection 
app.listen(port || process.env.PORT, () => console.log(`App listening on port ${port}!`))

app.use(express.json())
app.use(bodyParser.json());

app.use(login)
app.use(userRouter);

//Not Found MW
app.use((req, res) => {
    res.status(404).send("Didn't Found");
});

//Error MW
app.use(function (err, req, res, next) {
  console.error('ERROR -+-+-+-+-+' + err.stack)
  res.status(500).send('Something went wrong!')
});





