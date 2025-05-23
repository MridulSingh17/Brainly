import mongoose, { model, mongo, Schema } from "mongoose";

mongoose.connect("mongodb+srv://mridulsingh17:Q5k1aiGIpRPwcICd@cluster0.oavk6.mongodb.net/brainly")
const UserSchema=new Schema({
    username:{type: String, unique:true},
    password: String
})

export const UserModel= model("User", UserSchema)

const ContentSchema= new Schema({
    title:String,
    link: String,
    tags:[{type:mongoose.Types.ObjectId, ref:'tag'}],
    type: String,
    userId:[{type:mongoose.Types.ObjectId, ref:"User", required:true}]

})
const LinkSchema= new Schema({
    hash:String,
    userId:[{type:mongoose.Types.ObjectId, ref:"User", required:true}]

})
export const LinkModel=model("LinkModel",LinkSchema)
export const ContentModel=model("Content", ContentSchema)