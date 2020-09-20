const express = require('express')
const router = express.Router()
const products = require('../models/product')
const {checkAuthenticated} = require('../controller/AuthController')
const BusinessController = require('../controller/businessController')

router.get('/',(req,res)=>{
    res.render('index.html')
})

router.get('/shop',checkAuthenticated, BusinessController.getShop)

router.get('/shopping-cart',checkAuthenticated,BusinessController.getShoppingCart)

router.get('/addtocart/:id',checkAuthenticated,BusinessController.getAddToCart)

router.get('/removefromcart/:id',checkAuthenticated,BusinessController.getRemoveFromCart)

router.post('/update/:id',BusinessController.PostUpdate)

router.post('/transactions',checkAuthenticated,BusinessController.postTransaction)

router.get('/transactions',checkAuthenticated,BusinessController.getTransaction)

router.post('/hireshivam',checkAuthenticated,BusinessController.hireShivam)

router.post('/addproducts',(req,res)=>{
    name = req.body.name
    price = req.body.price
    image = req.body.image
    p = new products({
        name:name,
        price:price,
        image:image
    })
    p.save()
    res.send(200).json({
        "message":"done"
    })
})


module.exports = router;