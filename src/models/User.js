import { Schema, model} from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    balance: {
        type: Number,
    default: 0
},
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    city: {
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
    },
isAdmin: {
    type: Boolean,
    default: false
},
}, {timestamps: true})

const User =  model("User", userSchema)

export default User