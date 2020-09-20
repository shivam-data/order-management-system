const products = require('../models/product')
const User = require('../models/user')
const Transactions = require('../models/transaction')

function getShop(req,res){
    products.find({})
        .then((data)=>{
            prods = data
         res.render('shop.html',{prods:prods})
    });
}

function hireShivam(req,res){
     res.render('shopping-cart.html',{cart:req.session.user.cart,grandtotal:0})
}

function getShoppingCart(req,res){
    grandtotal = 0
    req.session.user.cart.forEach(item=>{
        grandtotal = grandtotal + item.product.price * item.quantity
    })
    res.render('shopping-cart.html',{cart:req.session.user.cart,grandtotal:grandtotal})
}

const getAddToCart = async (req,res) => {
    req.session.user.cart.forEach(item=>{
        if(item.product._id === req.params.id){
            item.quantity = item.quantity + 1
            res.redirect('/shop')
        }
    })

    product = await products.findOne({_id:req.params.id})
    user = await User.findOne({_id:req.session.user._id})

    req.session.user.cart.push({product:product,quantity: 1})
    user.cart = req.session.user.cart
    user.save()

    res.redirect('/shop')
}

function getRemoveFromCart(req,res){
    id = req.params.id
    req.session.user.cart = req.session.user.cart.filter(item=>item.product._id !== id)
    user = User.findOne({_id:req.session.user._id})
    user.cart = req.session.user.cart
    res.redirect('/shopping-cart')

}

function PostUpdate(req,res){
    id= req.params.id
    quantity = req.body.quantity
    req.session.user.cart.forEach(item=>{
        if(item.product._id === id){
            item.quantity = quantity
        }
    })
    res.redirect('/shopping-cart')
}

function postTransaction(req,res){
    transaction = new Transactions({
        amount: req.body.amount,
        user: req.session.user._id,
        date: new Date()
    })
    transaction.save()

    req.session.user.cart = []
    User.findOne({ _id:req.session.user._id }, function (err, user){
    user.cart = [];
    user.save();
    });
    res.redirect('/transactions')
}

function getTransaction(req,res){
    Transactions.find({
        user:req.session.user._id
    })
        .then(data=>{
            transactions = data
            res.render('transactions.html',{transactions:transactions})
    })
}

module.exports = {
    getShop,getShoppingCart,getAddToCart,getRemoveFromCart,PostUpdate,postTransaction,getTransaction,hireShivam
}