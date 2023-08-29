require('dotenv').config();
const fs =require('fs');
const path = require('path');
const express =require('express');
const app = express();
const cors = require('cors');
const mongoose =require('mongoose');
const { config } = require('dotenv');
const connectionDB = require('./config/conndb');
const PORT = process.env.PORT || 3501;

// connect to mongoDb
connectionDB();

const whiteList=['http://localhost:3000','http://localhost:3500'];
const corsOption={
  origin : (origin,callback) =>{
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null,true)
    }else{
      callback(new Error ('not allowed by cores'))
    }
  },
  optionSuccessStatus : 200
}

app.use(cors(corsOption));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/',express.static(path.join(__dirname,'..','frontend/build')));
app.use('/',require( "./routes/api/signuproutes"));
app.use('/',require( "./routes/api/checkroute"));
app.use('/', require("./routes/api/loginroute"));




app.all('*', (req,res) =>{
  res.status(404);
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'..','frontend/build','404.html'))
  }else if(req.accepts('json')){
    res.json({error : "404 not found "});
  }else{
    res.type('txt').send("404 not found")
  }
});
// we don't want to listen if there is no connection
mongoose.connection.once('open',()=>{
  app.listen(PORT,() => console.log(`the port run on ${PORT}`));
  console.log('connection sucess');
})

