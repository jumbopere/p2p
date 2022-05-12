import { Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },


    city: {
type: String,
required: true
    },
    address: {
type: String,
required: true
    },
    state: {
type: String,
required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    activationCode: {
        type: String,
        unique: true,
    },
isAdmin: {
    type: Boolean,
    default: false
},

}, {timestamps: true})

const User =  model("User", userSchema)

export default User