import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_url } from "../Config";


export function useContent(){
    const [contents,setContents]=useState([]);

    function refresh(){
        axios.get(`${Backend_url}/api/v1/content`,{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response)=>{
                setContents(response.data.content)
            })
    }

    // useEffect(()=>{
    //     refresh()
    //     // let interval= setInterval(() => {
    //     //     refresh()
    //     // }, 10*1000)
    //     // return ()=>{
    //     //     clearInterval(interval)
    //     // }
    //             },[contents])
    return {contents,refresh}
}