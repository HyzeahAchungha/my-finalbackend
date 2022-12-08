const User =require('../Models/userModel')
const jwt = require('jsonwebtoken')
const { Server } = require('../server.models')

const createToke = (_id)=>{
  return jwt.sign({_id}, process.env.SECRET_KEY,{expiresIn:'3d'})
}



//login user
const loginUser = async(req,res)=>{
    const {email, password}= req.body

    try {
        const user = await Server.find({email,password})
        const token = createToke(user._id)
      res.status (200).json({email,token}) 
     } catch (error) {
      res.status (400).json({error: error.message })  
     }
  
}


//signup user
const signupUser = async(req,res)=>{
     const {email,password} = req.body
     try {
        const user = await Server.signup(email,password)
        console.log(user, 'This is where problems are');
        const token = createToke(user._id)
      res.status (200).json({email,token}) 
     } catch (error) {
      res.status (400).json({error: error.message })  
     }
    
}

const getAllUsers = async (req, res)=>{
  console.log("YOu have hit this route")
  try{
    const users = await Server.find();
    res.status(200).json({
      status: "success",
      data: {
        users
      }
    });
  }catch(err) {
    res.status(404).json({
      status: "failed",
      messaged: err
    })
  }


}
module.exports={signupUser,loginUser, getAllUsers};

  