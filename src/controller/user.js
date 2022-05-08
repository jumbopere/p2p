import User from "../models/User";
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import randomToken from "random-token"
import { sendVerificationEmail } from "../utils/sendMail";
import {  isAuth, isAdmin } from "../utils/verifyToken";
import { registerValidator } from "../utils/validate";


 export const register = async(req, res)=> {
const { firstName ,lastName,  email, phoneNumber, password, state, city, address,gender } = req.body
const { errors, isValid } = registerValidator(req.body);
const activationToken = randomToken(16)
    try{
      if (!isValid) {
        return res.status(400).json(errors);
      }
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(409).send({error: " User Already exists"})
        }
        if(password.length < 8){
            return res.status(400).send({error:"Password must be 8 or characters"})
        }

        const instance = new User({
           firstName,
           lastName,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
            phoneNumber,
            state,
            city,
            address,
            activationCode:activationToken,
            gender

        })
const user = await instance.save();

// if (user.isAdmin === false) {
//     sendVerificationEmail(user.email, user.fullName, user.activationCode);
//   }
  return res.status(201).json({
    message: 'User was created successfully',
    user,
  });
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }
}

export const userActivate = async(req, res)=> {
    const { activationCode} = req.body
    try{
        const user = await User.findOne({ activationCode });
    if (!user) {
      return res.status(400).send({ error: 'activate code is invalid' });
    }
    if (user.activated) {
      return res.status(400).send({ error: 'user already activated' });
    }
    const query = {
        $set: {
            activated: true
        }
    };

    const activatedUser = await User.findOneAndUpdate(activationCode, query, {
        new: true
    })
    const token = jwt.sign({ email: activatedUser.email, _id: activatedUser._id }, process.env.SECRET, { expiresIn: "30d"})
return res.status(200).json({
    message: 'Token was verified successfully',
    activatedUser,
    token

})
    }catch(err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'})
    }
}

export const login = async(req,res)=> {
const { email, password}= req.body
try {
    const user = await User.findOne({email: email.trim().toLowerCase()});
    if (! user) {
        return res.status(401).send({error: 'Failed to authenticate user'});
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
    hashedPassword !== password && res.status(401).send({error: 'Failed to authenticate user'});

    if (!user.activated) {
        return res.status(401).send({
          message: 'You need to activate account',
          error: 'activate account',
        });
      }
     
      const token = jwt.sign({ email: oldUser.email, _id: oldUser._id }, process.env.SECRET, { expiresIn: "30d"})
      res.status(200).json({
       user,
       token
      })
}
catch(err) {
    console.log(err)
    return res.status(500).send({ error: "Something went wrong"})
}
}


export const deleteUser =async (req, res)=> {
 try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin === true) {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ error: 'User Not Found' });
    }

 }
 catch(err) {
    console.log(err)
    return res.status(500).send({ error: "Something went wrong"})
}
    
 } ;

 export const updateUser = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).send({ error: 'user not found' });
      }
      const query = {
        _id: req.params.id,
      };
      const userObj = {
        $set: {
          ...req.body,
        },
      };
      const updatedUser = await User.findOneAndUpdate(query, userObj, {
        new: true,
      });
  
      return res
        .status(201)
        .send({ message: 'updated was successfully', updatedUser });
    } catch (error) {
      return res.status(500).send({ error: 'something went wrong' });
    }
  };
  
  export const getOneUser =   async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ error: 'User Not Found' });
      }
    } catch (error) {
      res.status(500).json({ error: "something went wrong" })
    }
  }
  

  export const getAllUsers = async(req, res)=> {
      try{
const users =await User.find({});
res.staus(200).send('Users fetched Successfully', users)
      }catch (error) {
      res.status(500).send({ error: "something went wrong" })
    }
  }
