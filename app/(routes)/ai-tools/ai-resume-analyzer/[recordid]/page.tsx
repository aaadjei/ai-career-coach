'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, } from 'react'
import Report from '../_components/Report';

const AiResumeAnalyzer = () => {
  const { recordid } = useParams();
  const [pdfUrl, setPdfUrl] = useState();
  const [aiReport, setAiReport] = useState();
  
  
  useEffect(() =>{
    recordid && GetResumeAnalyzer();
  }, [recordid]) 

  const GetResumeAnalyzer = async() => {
     const result = await axios.get('/api/history?recordId='+recordid);
        console.log(result.data);
        setPdfUrl(result.data?.metaData);
        setAiReport(result.data?.content);
  }

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1 h-[85vh]'>
      <div className='col-span-3 overflow-y-auto border-r h-full'>
        <Report aiReport={aiReport} />
      </div>
      <div className='col-span-2 overflow-y-auto p-3 h-full'>
        <h2 className='font-bold text-2xl mb-5'>Resume Preview</h2>
        <iframe
          src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
          width='100%'
          height='100%'
          className='min-w-lg'
        />
      </div>
    </div>
  )
}

export default AiResumeAnalyzer