import { useRef, useState } from "react";
import { CrossIcon } from "../icon/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { Backend_url } from "../Config";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}

export function CreateContentModal({open,onClose}:{open:boolean,onClose:()=>void}){
    const titleRef= useRef<HTMLInputElement>(null);
    const linkRef= useRef<HTMLInputElement>(null);
    const [type,setType]=useState(ContentType.Youtube)
    

    async function addContent(){
        const title= titleRef.current?.value;
        const link= linkRef.current?.value;

        await axios.post(`${Backend_url}/api/v1/content`,{
            title,
            link,
            type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        onClose()
       
    }
    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-200 fixed top-0 left-0 opacity-60 flex justify-center">
            

        </div>
        <div className="w-screen h-screen  fixed top-0 left-0 flex justify-center">
        <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100  fixed rounded-md p-4 shadow-md border border-gray-600">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                        <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder={"Title"}/>
                        <Input reference={linkRef} placeholder={"Link"}/>
                    </div>
                    <div>
                        <h1 className="flex justify-center">Select Type:</h1>
                        <div className="flex gap-1 p-4">
                            <Button text={"Youtube"} variant={type === ContentType.Youtube?"Primary":"Secondary"} 
                            onClick={()=>{
                                setType(ContentType.Youtube)
                            }}/>
                            <Button text={"twitter"} variant={type === ContentType.Twitter?"Primary":"Secondary"}
                            onClick={()=>{
                                setType(ContentType.Twitter)
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="Primary" text={"Submit"} />
                    </div>
                </span>

            </div>
            

        </div>
         
        </div>}
    </div>
}


