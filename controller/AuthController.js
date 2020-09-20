const User = require('../models/user')
const bcrpyt = require('bcryptjs')

const register = (req,res,next)=>{
    bcrpyt.hash(req.body.password1,8,function (err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

    let user = new User({
        name:req.body.username,
        email:req.body.email,
        password:hashedPass
    })
    user.save()
})
    res.redirect('/login')
}

const login = async (req,res,next) =>{
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
}

function checkUnAuthenticated(req,res,next){
    if(req.session.isAuthenticated){
        console.log('User Authenticated')
        res.redirect('/')
    }
    else{
        console.log('User not authenticated')
        next()
    }
}

function checkAuthenticated(req,res,next){
    if(req.session.isAuthenticated){
        next()
    }
    else {
        res.redirect('/login')
    }
}

module.exports = {
    register,checkAuthenticated,checkUnAuthenticated,login
}