// import db.js
const db = require('./db')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// register
const register =(uname,email,pswd)=>{
        return  db.User.findOne({
                email
             }).then((result)=>{
                  // console.log(result);
                  if(result){
                      return{
                        statusCode:403,
                        message:'Email already exists'
                      }
                  }else{
                    // add new user
                    const newUser = db.User({
                        username:uname,
                        email,
                        password:pswd,
                        orders:[]
                    })
                    // save user in mongoDB
                    newUser.save()
                    return{
                        statusCode:200,
                        message:'Registration Successfull..'
                    }
                        
                  }
             })
}

// login
const login=(email,pswd)=>{

    return db.User.findOne({
        email,
        password:pswd
    }).then((result)=>{
              if(result){
                // generate token
                const token = jwt.sign({
                  currentEmail:email
                },'pekka123')
                return{
                    statusCode:200,
                        message:'Login Successfull..',
                        email:result.email,
                        pswd:result.password,
                        token
                       
                }
              }else{
                return{
                    statusCode:404,
                    message:'Invalid Email / Pasword'
                }
              }
    })

}

// Adminlogin
const adminlogin=(email,pswd)=>{

  return db.Admin.findOne({
    email,
    password:pswd
}).then((result)=>{
         if(result){
          // generate token
          const token = jwt.sign({
            currentEmail:email
          },'wizard123')
          return{
            statusCode:200,
            message:"AdminLogin successful",
            email:result.email,
            pswd:result.password,
            token
          }
         }
         else{
          // add new item
          return{
            statusCode:404,
            message:"invalid"
          }
         }
})

}

// additem
const additem = (qty,id,iname,img,des,type,price)=>{
  return db.Additem.findOne({
    iname
  }).then((result)=>{
     if(result){
      return{
        statusCode:403,
         message:'Item already exists'

      }
     }else{
      const newItem =db.Additem({
        qty,
        id,
        iname,
        img,
        des,
        type,
        price
      })
      // save item in mongoDB
      newItem.save()
      return{
          statusCode:200,
          message:'Item Added Successfull..'
      }
     }
  })
}

// get all items
const allitems = ()=>{
  return db.Additem.find()
  .then((result)=>{
    if(result){
      return{
        statusCode:200,
        items:result
      }
    }else{
      return{
        statusCode:400,
        message:"No data is present"
      }
    }
  })
}

// addtoOrderlist
const addtoOrderlist = (email,item,id)=>{
  return db.User.findOne({
      email,
      // orders:{
      //   "$elemMatch":{
      //     id:item.id
      //   }
      // }

      
  })  
  .then(result =>{
    console.log(result);
      if(result){
               result.orders.push({
                qty:item.qty,
                id:item.id,
                iname:item.iname,
                img:item.img,
                type:item.type,
                price:item.price
               })
       result.save()
          return{
              statusCode:200,
              message:"Item added to your OrderList"
          }
      }
      else{
        
          return{
              statusCode:404,
              message:"Item already added to your OrderList"
          }
      }
  })
}

// // getmyOrders
const getmyOrders = (email)=>{
  // let email = req.email
      // console.log(email);
  return  db.User.findOne({email})
  .then((result)=>{
          if(result){
              return{
                  statusCode:200,
                  orders:result.orders
              }

          }else{
              return{
                  statusCode:404,
                  message:"Orders List is empty"
              }
          }
          
      }
            

   )
}

// deleteAnItem
const deleteAnItem=(iname)=>{
  return db.Additem.deleteOne({
      iname
  }).then((result)=>{
    console.log(result);
      if(result){
          return{
              statusCode:200,
              additem:result
          }
  
      }
      else{
          return{
              statusCode:401,
              message:" Item not found"
          }
  
      }
  })
  }

  // getAnItem
const getAnItem=(id)=>{
  console.log(id);
  return db.Additem.findOne({
    
      id
  }).then((result)=>{
    
      if(result){
          return{
              statusCode:200,
              data:result
          }
  
      }
      else{
          return{
              statusCode:401,
              message:" Item not found"
          }
  
      }
  })
  }

  // get all items
const allorders = ()=>{
  return db.User.find()
  .then((result)=>{
    if(result){
      return{
        statusCode:200,
        items:result
      }
    }else{
      return{
        statusCode:400,
        message:"No data is present"
      }
    }
  })
}





// export
module.exports={
    register,
    login,
    adminlogin,
    additem,
    allitems,
    addtoOrderlist,
    getmyOrders,
    deleteAnItem,
    getAnItem,
    allorders
    

    
}