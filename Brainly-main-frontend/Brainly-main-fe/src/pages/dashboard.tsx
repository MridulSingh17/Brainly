import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icon/PlusIcon"
import { ShareIcon } from "../icon/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { Backend_url } from "../Config"

export function Dashboard(){
  const [modalOpen,SetModalOpen]=useState(false)
  const {contents,refresh}= useContent()
  useEffect(()=>{
    refresh()
  },[modalOpen])

  return <div>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-1">
      <CreateContentModal open={modalOpen} onClose={()=>{
        SetModalOpen(false)
      }}/>
      <div className="flex justify-end gap-2 py-2">
        <Button onClick={()=>{
          SetModalOpen(true)
        }} variant="Primary" text={"Add Content"} StartIcon={<PlusIcon/>}></Button>
        <Button onClick={async()=>{
          const response= await axios.post(`${Backend_url}/api/v1/brain/share`,{
            share:true
          },{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          })
          const shareURL= `http://127.0.0.1:5173/dashboard${response.data.hash}`;
          navigator.clipboard.writeText(shareURL)
          alert("Share link is copied to clipboard.")
        }} variant="Secondary" text={"Share Brain"} StartIcon={<ShareIcon/>}></Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({type,link,title})=><Card 
           type={type}
           link={link} 
           title={title} 
        />)}
        
        
      </div>


    </div>
  </div>
}

export default Dashboard
