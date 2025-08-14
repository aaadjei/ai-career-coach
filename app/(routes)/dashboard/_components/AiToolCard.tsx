"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs'
import ResumeUploadDialog from './ResumeUploadDialog'
import { open } from 'node:inspector'
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog'


interface TOOL{
    name:string,
    desc:string,
    icon:string, 
    button:string,
    path:string,

}

type AiToolProps = {
    tool: TOOL
}

const AiToolCard = ({tool}: AiToolProps) => {
  const id = uuidv4();
  const { user }= useUser();
  const router = useRouter();
  const [openResumeUpload, setOpenResumeUpload]=useState(false);
  const [openRoadmapDialog,setOpenRoadmapDialog]= useState(false);


  const onClickButton= async()=>{
    if(tool.name=='AI Resume Analyzer'){
      setOpenResumeUpload(true);
      return;
    }

    if(tool.path=='/ai-tools/ai-roadmap-agent'){
      setOpenRoadmapDialog(true);
      return;
    }

    //Create New record to History Table
    const result=await axios.post('/api/history',{
      recordId:id,
      content:[],
      aiAgentType: tool.path
    });
    console.log(result);
    router.push(tool.path + '/'+ id)
  }


  return (
    <div className='p-3 border rounded-lg'>
        <Image src={tool.icon} width={50} height={50} alt={tool.name} />
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        
        <Button className='w-full mt-3'
        onClick={onClickButton}>{tool.button}</Button>
        
        <ResumeUploadDialog openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeUpload}/>
        <RoadmapGeneratorDialog openDialog={openRoadmapDialog}
        setOpenDialog={() => setOpenRoadmapDialog(false)}/>
    </div>
  )
}

export default AiToolCard