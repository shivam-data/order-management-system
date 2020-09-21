const express = require('express')
const mongoose = require('mongoose')
var nunjucks  = require('nunjucks');
const session = require('express-session')

require('dotenv').config()


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true});

const app = express()

const AuthRoute = require('./routes/authroute')
const BusinessRoute = require('./routes/businessroute')

nunjucks.configure(['views/'],{
  autoescape:false,
  express:app
})

app.use(session({
    secret: "supersecretfile",
    resave: true,
    saveUninitialized: true,
}));

app.use(express.json())
app.use(express.static('static'))
app.use('/css',express.static(__dirname+'static/css'))
app.use('/img',express.static(__dirname+'static/img'))
app.use('/js',express.static(__dirname+'static/js'))

app.use(express.urlencoded({extended:false}))


app.use('/',AuthRoute)
app.use('/',BusinessRoute)

app.listen(process.env.PORT)