// const express = require("express");
// const router = express.Router();
// const User = require("../models/user")
// const bcrypt = require('bcrypt');

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, "kishan sheth super secret key", {
//     expiresIn: maxAge,
//   });
// };

// router.post("/register", async(req, res) => {
  
// //     const {name , email , password} = req.body

// //     const userCheck = await User.findOne({email});
// //     if(userCheck){
// //         res.status(404).json({
// //             message : 'User already exists',
// //             status : false
// //         })
// //     }
// // const secPass = await bcrypt.hash(password,10);
// //     const newUser = new User({name , email , password : secPass})

// //     try {
// //         newUser.save()
// //         res.send('User Registered successfully')
// //     } catch (error) {
// //          return res.status(400).json({ message: error });
// //     }
// try {
//     const {name, email, password } = req.body;
//     const userCheck = await User.findOne({email});
//     if(userCheck){
//         res.status(403).json({
//             message : "Email already exists"
//         })
//     }
//     const secPass = await bcrypt.hash(password,10);
//     const user = await User.create({name , email, password : secPass });
//     await user.save();
//     console.log(user);
//     const token = createToken(user._id);
//    console.log(token);
//     // res.cookie("jwt", token, {
//     //   withCredentials: true,
//     //   httpOnly: false,
//     //   maxAge: maxAge * 1000,
//     // });

//     res.status(201).json({ user: user._id, created: true });
//   } catch (err) {
//     console.log(err);
//     console.log(err.message)
//     res.status(403).json({ 
//         "message" : "an error ocurred"
//     });
//   }
// });


// router.post("/login", async(req, res) => {

//     const {email , password} = req.body

//     try {
        
//         const user = await User.findOne({email})

//         if (!user) {
//             res.status(404).json({
//               message: "User not found",
//               status: false
//             });
//           } else {
//             const auth = await bcrypt.compare(password, user.password);
//             if (auth) {
//               res.status(200).json({
//                 user,
//                 message: "login ok"
//               });
//             } else {
//               res.status(400).json({ message: 'User Login Failed' });
//             }
//           }
          

//     } catch (error) {
//            return res.status(400).json({ message: 'Something went weong' });
//     }
  
// });


// router.get("/getallusers", async(req, res) => {

//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }
  
// });

// router.post("/deleteuser", async(req, res) => {
  
//     const userid = req.body.userid

//     try {
//         await User.findOneAndDelete({_id : userid})
//         res.send('User Deleted Successfully')
//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }

// });



// module.exports = router








const User = require("../models/user")

const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
const otp = require('../models/otp');
const router = require('express').Router();
require("dotenv").config();
// const generateOTP = require('../generateOTP');





const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

router.post("/register",  async (req, res, next) => {
  try {
    const {name, email, password } = req.body;
    const userfind = await User.findOne({email});
    if(userfind){
      req.status(403).json({
        message : "User already exists"
      })
    }
    const user = await User.create({name, email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
});


router.post("/login",  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

   
    const isAdmin = user.isAdmin;

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

  
    res.status(200).json({ user: user._id, isAdmin: isAdmin, status: true , name : user.name , email : user.email});
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
});



router.get("/getallUsers" , async (req,res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message : "Cant find users"
    })
    
  }
});



const generateOTP = () => {
  const otpLength = 6;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
  console.log(otp);
};



// Route for sending OTP
// module.exports.sendotp =  async (req, res) => {
//   const { email } = req.body;
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail", // Use your email service provider
//       auth: {
//         user: "kalagotlabharathkumarreddy@gmail.com", // Your email address
//         pass: process.env.EMAIL_password,// Your email password
//       },
//     });

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//   console.log(user);
//     // Generate OTP
//     const otp = generateOTP(); // Replace with your OTP generation logic
//    console.log(otp);
//     // Save the OTP to the user's document in the database
//     user.otp = otp;
//     await user.save();
//  console.log(user);
//     // Create an email message
//     const mailOptions = {
//       from: "kalagotlabahrathkumarreddy@gmail.com",
//       to: {email},
//       subject: "OTP for password Reset",
//       text: `Your OTP for password reset is: ${otp}`,
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         console.log(error)
//         console.log(error.message);
//         return res.status(404).json({ message: "Failed to send OTP" });
//       }

//       console.log(`Email sent: ${info.response}`);

//       // Return a success message if the email is sent successfully
//       return res.status(200).json({ message: "OTP sent successfully" });
//     });
//   } catch (error) {
//     console.error(error);
//     console.log(error);
//     return res.status(404).json({ message: "Internal Server Error" });
//     console.log(error.message);
//   }
// };





router.post("/sendEmail" , async (req,res) => {
    const {email} = req.body;
     try {
        const checkemail = await User.findOne({email});

        if(!checkemail){
          res.send(404).json({
            message : "user not found"
          })
        }else {
          let otpcode = Math.floor((Math.random()*10000) + 1);
           let otpData = new otp({
            email ,
            code : otpcode,
            expiresIn : new Date().getTime() + 300 * 1000
           })
   
            
           let otpResponse = await otpData.save();

           var transporter = require('nodemailer');
           var transporter = nodemailer.createTransport({
             service : "gmail",
             port : 587,
             secure : false,
            auth : {
              user : 'kalagotlabharathkumarreddy@gmail.com',
              pass : process.env.EMAIL_password
            }
           })
        
           var mailOptions = {
             from : 'kalagotlabharathkumarreddy@gmail.com',
             to : email,
             subject : `sending email using nodejs`,
             text : `Thanlk you ${otpcode} `
           }
        
        
           transporter.sendMail(mailOptions , function (error , info){
            if(error){
              console.log(error);
              console.log(error.message);
            }else {
              console.log('Email sent : ' + info.response);
            }
           })

           res.status(201).json({
            message : "Please check your email id"
           })

        }
     } catch (error) {
        console.log(error);
        res.status(404).json({
          message : "an error ocurred"
        })
     }
});



router.post("/changepassword" , async (req,res) => {
  const {email} = req.body;
  const {code} = req.body;
  const {password} = req.body;
  console.log(req.body)
   try {
    let data = await otp.find({email,code});
    console.log(data);
    const response = {}
    if(data){
      let currtime = new Date().getTime();
      let diff = data.expiresIn - currtime;
      if(diff < 0){
        res.status(404).json({
          message : "Token expired"

      }) 
    

      } else {
        let user = await User.findOne({email});
        if(!user){
          res.status(404).json({
   message : "User not found"
          })
        }  
         else {

        user.password = password;
          console.log(user.password);
         await user.save();

        console.log(user);
        res.status(201).json({
          message : "password changed successfully"
        })
         }
          
      }
    }
   } catch (error) {
      console.log(error);
      console.log(error.message)
   }
});


// module.exports.mailer = async (req,res) => {

//   const  {email}  = req.body
//    var transporter = require('nodemailer');
//    var transporter = nodemailer.createTransport({
//      service : "gmail",
//      port : 587,
//      secure : false,
//     auth : {
//       user : 'kalagotlabharathkumarreddy@gmail.com',
//       pass : process.env.EMAIL_PASSWORD
//     }
//    })

//    var mailOptions = {
//      from : 'kalagotlabharathkumarreddy@gmail.com',
//      to : email,
//      subject : 'sending email using nodejs',
//      text : 'Thanlk you'
//    }


//    transporter.sendMail(mailOptions , function (error , info){
//     if(error){
//       console.log(error);
//       console.log(error.message);
//     }else {
//       console.log('Email sent : ' + info.response);
//     }
//    })
// }



module.exports = router;