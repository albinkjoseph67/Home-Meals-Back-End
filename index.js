// import express
const express = require('express')

// import cors
const cors =require('cors')

// import dataservice
const dataservice = require('./services/dataService')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// import db.js
const db = require('./services/db')

// server app
const server = express()


// use cors
server.use(cors({
    origin:'http://localhost:4200'
}))
// parse json data
server.use(express.json())

// port
server.listen(3000,()=>{
    console.log('Server started at 3000');
})

// application specific middleware
// const appMiddleware = (req,res,next)=>{
//     console.log('inside middleware');
//     next()
// }
// server.use(appMiddleware)

// token verify middleware
const jwtMiddleware = (req,res,next)=>{
    console.log('inside router middleware');

    // get token from req headers
    const token = req.headers['access-token']
    
    try{
        // verify token
        const data= jwt.verify(token,'pekka123')
        next()
    }catch{
        console.log('invalid token');
        res.status(401).json({
            message:'Please Login!!'
        })
    }
    
   
   
}

// register api call
server.post('/register',(req,res)=>{
    // console.log(req.body);
    dataservice.register(req.body.uname,req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)    
    })
    
    
})

// login api call
server.post('/login',(req,res)=>{
    console.log(req.body);
    dataservice.login(req.body.email,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)    
    })
    
    
})

// Adminlogin api call
server.post('/adminlogin',(req,res)=>{
    console.log(req.body);

    dataservice.adminlogin(req.body.email,req.body.pswd)
    .then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })
})

// additem api call
server.post('/additem',(req,res)=>{
    console.log(req.body);
    console.log('inside add item');
    dataservice.additem(req.body.qty,req.body.id,req.body.iname,req.body.img,req.body.des,req.body.type,req.body.price)
    .then((result)=>{
        console.log(result);
        res.status(result.statusCode).json(result)
    })

})
    
// allitems  api
server.get('/dashboard',jwtMiddleware,(req,res)=>{
    dataservice.allitems()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// add item to orderlist api
server.post('/addToOrderlist',(req,res)=>{
    dataservice.addtoOrderlist(req.body.email,req.body.item,req.body.id)
    .then((result)=>{
     res.status(result.statusCode).json(result)
    })
})


// getmyOrders Api
server.get('/myorders/:email',(req,res)=>{
    // console.log(req.body.email);
    // console.log(req.body.email);
    dataservice.getmyOrders(req.params.email)
    .then((result)=>{
     res.status(result.statusCode).json(result)
    })

})

// getallitems
server.get('/getallitems',(req,res)=>{
    dataservice.allitems()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// delete-an item
server.delete('/delete-item/:iname',(req,res)=>{
    // console.log('Inside delete api');
    // console.log(req.params.iname);
    // asynchronous
    dataservice.deleteAnItem(req.params.iname)
    .then((result)=>{
        res.status(result.statusCode).json(result)

    })
   
})

// getanitem
server.get('/get-item/:id',(req,res)=>{
    dataservice.getAnItem(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// updateitem api call
server.put('/updateitem',(req,res)=>{
    console.log(req.body);
    updatedValue= db.Additem.updateOne(
        {id:req.body.id},
        {
            $set:
            {   qty:req.body.qty,
                id:req.body.id,
                iname:req.body.iname,
                img:req.body.img,
                des:req.body.des,
                type:req.body.type,
                price:req.body.price
            }
        },
        { upsert:true},
        (error,updatedValue)=>{
            if(error){
            
               return  next(error)
                
            }else{
            return    res.json(updatedValue)
            }
        }

        
     )
     
     
    
})  




server.put('/delete-item-cart',(req,res,next)=>{
    console.log(req.body);
    updatedValue= db.User.updateOne(
        {email:req.body.mail},
        {
            $pull:
            
        {
            orders:
                {
                 qty:req.body.qty,
                 id:req.body.id,
                 iname:req.body.iname,
                 img:req.body.img,
                type:req.body.type,
                price:req.body.price
                }
                
            }
        },
        { upsert:true},
        (error,updatedValue)=>{
            if(error){
            
               return  next(error)
                
            }else{
            return    res.json(updatedValue)
            }
        }

        
     )
     
     
    
})  

// getallorders
server.get('/getallorders',(req,res)=>{
    dataservice.allorders()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})