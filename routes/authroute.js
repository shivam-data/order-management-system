const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.get('/signup',AuthController.checkUnAuthenticated,(req,res)=>{
    res.render('signup.html')
})

router.post('/signup',AuthController.checkUnAuthenticated,AuthController.register)

router.get('/login',AuthController.checkUnAuthenticated,(req,res)=>{
  res.render('login.html')
})

router.post("/login", AuthController.checkUnAuthenticated,async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400);
      return next(new Error("Email not found!"));
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch) {
      res.status(400);
      return next(new Error("Invalid password"));
    }

    req.session.user = user
    req.session.isAuthenticated = true
    res.redirect('/')

  }
  catch (error){

  }
});


router.get('/logout',(req,res)=>{
  req.session.user = null
  req.session.isAuthenticated = false
  res.redirect('/')
})

module.exports = router