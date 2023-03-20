// import mongoose
const mongoose = require('mongoose')

// define connection
mongoose.connect('mongodb://localhost:27017/foodDelivery',()=>{
    console.log("MongoDB connected successfully");
})

// create model
const User = mongoose.model('User',{
    username:String,
    email:String,
    password:String,
    orders:[]
})

// admin Model
const Admin = mongoose.model('Admin',{
    username:String,
    email:String,
    password:String
})

// addproduct model
const Additem = mongoose.model('Additem',{
    qty:Number,
    id:Number,
    iname:String,
    img:String,
    des:String,
    type:String,
    price:Number
    
}) 

// Addtocart model
const Addtocart = mongoose.model('Addtocart',{
    qty:Number,
    id:Number,
    iname:String,
    img:String,
    type:String,
    price:Number
}) 


// export model
module.exports={
    User,
    Admin,
    Additem,
    Addtocart
}