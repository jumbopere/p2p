import User from "../models/User";
import jwt from "jsonwebtoken";
import CryptoJS from 'crypto-js';
import randomToken from "random-token"
import { sendVerificationEmail } from "../utils/sendMail";
import { generateToken, isAuth, isAdmin } from "../utils/verifyToken";

 export const register = async(req, res)=> {
const { fullName,username, email, phoneNumber, password, postalCode, state, city } = req.body
const token = randomToken(16)
    try{
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(409).json(" User Already exists")
        }
        if(password.length < 8){
            return res.status(400).json("Password must be 8 or characters")
        }

        const instance = new User({
            fullName,
            username,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
            phoneNumber,
            postalCode,
            state,
            city,
            activationCode:token

        })
const user = await instance.save();

if (user.isAdmin === false) {
    sendVerificationEmail(user.email, user.fullName, user.activationCode);
  }
  return res.status(200).json({
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
return res.status(200).json({
    message: 'Token was verified successfully',
    activatedUser,
    token: generateToken(activatedUser)

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
     

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
       username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        activated: user.activated,
        name: user.name,
        token: generateToken(user)
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
      res.status(404).send({ message: 'User Not Found' });
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
        res.status(404).send({ message: 'User Not Found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  

  export const getAllUsers = async(req, res)=> {
      try{
const users =await User.find({});
res.staus(200).send('Users fetched Successfully', users)
      }catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
