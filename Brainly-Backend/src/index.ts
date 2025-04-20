import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWTpassword } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import { corsOptions } from "./CorsOption";

const app = express();
app.use(express.json())
app.use(cors(corsOptions));

app.post("/api/v1/signup", async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    await UserModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"user signed up."}) 
}
)
app.post("/api/v1/signin", async(req,res)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    const existingUser= await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token= jwt.sign({
            id: existingUser._id
        },JWTpassword)
        res.json({
            token
        })    
    }
    else{
        res.status(403).json({
            message:"password is incorrect."
        })
    }
      try{
        UserModel.create({
        username:username,
        password:password
    })
    res.json({
        message:"user signed up."

})} catch(e){
    res.status(411).json({
        message:"User already exists"
    })
}


})

app.post("/api/v1/content", userMiddleware, async(req,res)=>{
    const type= req.body.type;
    const link= req.body.link;
    await ContentModel.create({
        link,
        type,
        title:req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags:[]
        

    })
    res.json({
        message:"content Addded."
    })

})

app.get("/api/v1/content", userMiddleware,async(req,res)=>{
    //@ts-ignore
    const userId=req.userId;
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId", "username")
    res.json({
        content
    })

})

app.delete("/app/v1/content", userMiddleware,async(req,res)=>{
    const contentId=req.body.ContentId
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })

})

app.post("/api/v1/brain/share", userMiddleware,async (req,res)=>{
    const share=req.body.share
    if(share){
        const existingLink= await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return
        }
        const hash=random(10)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash

        })
        res.json({
            message:"/share/"+ hash
        })

    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        })
        res.json({
            message:"Removed link."
        })
    }
    res.json({
        message:"Updated Shareable link."
    })

})
app.get("/api/v1/brain/:sharelink", async(req,res)=>{
    const hash=req.params.sharelink
    const link= await LinkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(410).json({
            message:"incorrect input"
        })
        return
    }
    const content=await ContentModel.findOne({
        userId:link.userId
    })

    const user = await UserModel.findOne({
        _id:link.userId
    })
    if(!user){
        res.status(411).json({
            message:"User not found, error should ideally not happen"
        })
        return
    }
    res.json({
        user:user.username,
        content:content
    })
    

})

app.listen(3000);
