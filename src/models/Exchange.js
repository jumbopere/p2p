import { Schema, model} from "mongoose";


 const exchangeSchema = new Schema({
     amount: {
         type: Number,
         required: true
     },
 referenceNo: {
type: String
 },
 user: {
     type: Schema.Types.ObjectId,
     ref: 'User'
 }
   
 }, {
     timestamps: true
 })

 const Exchange = model("Exchange", exchangeSchema)

export default Exchange