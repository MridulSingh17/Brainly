import { ReactElement } from "react";

interface SideBarItemProps{
    text:string;
    icon:ReactElement;
}

export function SidebarItem(props:SideBarItemProps){
    return <div className="flex text-gray-900 py-2 items-center hover:bg-gray-100 cursor-pointer 
    rounded pl-4 max-w-48 transition-all duration-400">
        <div className="p-2  ">
            {props.icon}  
        </div>
        <div className="">
            {props.text}
        </div>
        
    </div>
}