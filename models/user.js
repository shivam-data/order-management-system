const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Product = require('./product')
const Transaction =  require('./transaction')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    cart:[{
        product: {
            type:mongoose.Schema.Types.Object,
            ref: Product,
            required: true
        },
        quantity:{
            type: Number
        }
    }]
})

const User = mongoose.model('User',userSchema)

module.exports = User
