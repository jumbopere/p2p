import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config

export const generateToken = (user) => {
    return jwt.sign({
      _id: user._id,
      fullName: user.fullName,
      username: user.userame,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isAdmin: user.isAdmin,
      activated: user.activated
    }, process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
    )
  }
  
  export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(" ")[1] // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };
  
  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  