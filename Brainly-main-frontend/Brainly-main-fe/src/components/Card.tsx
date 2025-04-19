import { DeleteIcon } from "../icon/DeleteIcon";
import { DocumentIcon } from "../icon/document";
import { PlayIcon } from "../icon/PlayIcon";

interface CardProps {
    link:string;
    title:string;
    type:"twitter"|"youtube";

}

export function Card(props:CardProps){

    return <div>
        <div className="border-gray-100 shadow-md p-4 bg-white rounded-md max-w-72 border min-h-48 min-w-80 ">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-400">
                    <DocumentIcon/>
                    </div>
                    {props.title}
                    </div>
                <div className="flex items-center">
                    <div className="flex pr-2 text-gray-400">
                        <a href={props.link} target="_blank">
                             <PlayIcon/>
                        </a>
                    </div>
                    <div className="flex pl-2 text-gray-400 cursor-pointer">
                    <DeleteIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4">

                {props.type==="youtube" && <iframe className="w-full" src={props.link?.replace("watch","embed").replace("?v=","/")} 
                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                
                {props.type==="twitter" && <blockquote className="twitter-tweet">
                <a href={props.link?.replace("x.com","twitter.com")}></a> 
                </blockquote>}
            
            </div>
        </div>
    </div>

}