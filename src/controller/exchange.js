import User from "../models/User"
import Exchange from "../models/Exchange"
import { v4 as uuidv4} from "uuid"


export const createExchange = async(req, res)=> {
    try{
        const {id} = req.params
        const { amount } = req.body
        const user = await User.findOne({_id: id})
        if(!user){
            return res.status(401).json({ message: "User Not Found"})
        }
        if (!user.activated) {
            return res.status(401).send({
              message: 'You need to activate account, before you can perform exchange',
              error: 'activate account',
            });
          }
        if(user.balance <=1000|| user.balance < amount){
            return res.status(400).json({message: "Insufficient fund to perform this exchange "})
        }
        if (amount > user.balance ){
            return res.status(400).json({ message:"Amount greater than your balance, add more funds "})
        }

        const userObj = {
            $set: {
                balance: user.balance - amount
            }
        };
        const query = { _id: id};
        const updateUser = await User.findOneAndUpdate(
           query,
            userObj,
            { new: true }
          );

          if (!updateUser){
return res.status(409).json({ message: "Unable to start exchange"})
          };

          const instance = new Exchange({
              amount,
            referenceNo: uuidv4(),
            user: user._id
          })
          const exchange =  await instance.save()
          return res.status(200).json({message: "Excahnge created Successfully", exchange})
   
        }
catch(err){
    console.log(err)
    return res.status(500).send({error: 'something went wrong'});
}

}

export const getUserExchanges = async(req,res)=> {
    try{
        const {id} = req.params
const user = await User.findOne({_id: id})
if(!user){
    return res.status(401).json({ message: "User Not Found"})
}
const exchanges = await Exchange.find({
    user: user._id
})
if(exchanges.length <= 0){
    return res.status(400).json({message: "No Exchange Yet!!!"})
}
return res.status(200).json({message: " Exchange fetched succesfully ", exchanges})
    }catch (err){
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }

}

export const getAllExchanges= async(req,res)=> {
    try {
const exchange = await Exchange.find({})
if(exchange.length <= 0){
    return res.status(404).json({message: "Exchange list empty"})
}
return res.status(200).json("Exchange fetched successfully", exchange)
    }
catch(err){
    console.log(err)
    return res.status(500).send({error: 'something went wrong'});
}
}