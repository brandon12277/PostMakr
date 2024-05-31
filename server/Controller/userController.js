const User  = require("./../models/user")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { initializeApp } =require("firebase/app");
const firebaseConfig =require("../config/firebaseConfig.js");


const { getStorage, ref,getDownloadURL, uploadBytesResumable } = require("firebase/storage")





const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      return true
    } catch (error) {
      console.error('Invalid token:', error.message);
      return false
    }
  };

function getCurrentDateTimeString() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
  
   
    const dateTimeString = `${dateString} ${timeString}`;
  
    return dateTimeString;
  }
  
  async function file_url(file){
    const storageRef = ref(storage, "post_images/"+file.originalname+getCurrentDateTimeString());
  
   
    
    const metadata = {
      contentType  : file.mimetype
    }
    const snapshot = await uploadBytesResumable(storageRef, file.buffer,metadata)
    const DownloadURL = await getDownloadURL(snapshot.ref)
  
    return DownloadURL
  }



exports.createUser = async (req,res) => {

   try{
    const img_file = req.file;

    
   

   
    console.log(img_file)

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const img_url = await file_url(img_file)
    const data = {
        name : req.body.name,
        password : hashedPassword,
        email : req.body.email,
        firebaseUid : img_url
    }

    
    
    const user = await User.create(data)

    


    
    

    res.status(201).json({ message: 'User registered successfully'});

    
   }
   catch(err){
    console.log(err)
    res.status(400).json("Internal Error while logging In")
   }
   
}


exports.CheckUserToken = async (req,res) =>{


      const {token} = req.body
      if(verifyToken(token)){
        res.status(201).json(true)
        return;
      }

      res.status(201).json(false)
        return;

}




exports.validateUserCredentials = async (req,res) =>{
    try{
     const user = await User.findOne({email : req.body.email})
     console.log(user)
     
     if(user){
        let right_pass = true
       
        console.log(req.body.password,user.password)
        bcrypt.compare(req.body.password,user.password, (err, result) => {
            if (err) {
              
             
              right_pass = false
              console.error('Error comparing passwords:', err);
              return;
            }
            
            console.log(result)
            if (result) {
                
              console.log('Password is correct');
              return;
            } else {
              console.log('Password is incorrect');
            }
          });
          if(right_pass){
            const payload = {
                user: {
                  id: user._id
                }
              };
           
           const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
         
            res.status(201).json({ user:user, token:token });
          }
        else
        res.status(400).json("Invalid password")

     }
     else{
        res.status(400).json("Invalid Email")
     }
    }
    catch(err){

    }

    
}

