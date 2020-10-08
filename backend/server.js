const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const cors = require('cors')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
const app =express()

// const Resource = require('./models/Resources');
 const User = require('./models/Users')

app.use(cors());

const PORT=process.env.PORT || 5000

const keys = require('./config/keys');
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("mongodb is connected");
  });


  require('./config/passport')(passport)

  //initializing passport
  app.use(passport.initialize());
  
  
  
  //middleware for body parser
  app.use(bodyParser.urlencoded({ extended: false }));
  
  //parse application json
  app.use(bodyParser.json());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//golabal variable 
// app.use((req,res,next) => {
  
//   res.locals.user = req.user || null
//   next()
// })


const Resource = require('./routes/Resources')
const Teacher = require('./routes/Teachers')
const Student = require('./routes/Students')

const Auth = require("./routes/Auth");


app.use("/", Resource,Teacher,Student,Auth);


app.listen(PORT ,() =>{
    console.log( `port is running on ${PORT}`)
})