import { ReactElement } from "react";

interface ButtonProps{
    variant:"Primary"|"Secondary",
    text:String,
    StartIcon?:ReactElement
    onClick?: ()=>void;
    fullWidth?:boolean;
    loading?:boolean
}

const VariantStyles={
    "Primary":"bg-purple-600 text-white",
    "Secondary":"bg-purple-200 text-purple-400"
}

const defaultStyles="px-4 py-2 rounded-md font-extralight flex items-center cursor-pointer"

export function Button(props:ButtonProps){
    return <button onClick={props.onClick} className = {`${VariantStyles[props.variant]} ${defaultStyles} 
    ${props.fullWidth?"w-full flex justify-center items-center":""} ${props.loading?"opacity-45":""}`} disabled={props.loading}>
       <div className="pr-2">{props.StartIcon}</div>
        {props.text}

    </button>

}