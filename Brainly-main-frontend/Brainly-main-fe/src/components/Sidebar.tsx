import { Logo } from "../icon/Logo";
import { TwitterIcon } from "../icon/TwitterIcon";
import { YoutubeIcon } from "../icon/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";


export function Sidebar(){

    return<div className="h-screen w-72 border-r bg-white fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-4 items-center ">
            <div className="pr-2 text-purple-600">
                <Logo/>
            </div>
            Brainly
        </div>
        <div className="pt-4 pl-4">
            <SidebarItem text="Tweets" icon={<TwitterIcon/>}/>
            <SidebarItem text="Videos" icon={<YoutubeIcon/>}/>
        </div>
    </div>
}