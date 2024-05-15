"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URI } from "@/models/urlModel";

export default function Home() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyInputData, setCopyInputData] = useState("")
  const [data, setData] = useState<URI>();
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = async() =>{
    setIsSubmitting(true)
    setIsCopied(false)
    try {
      const response= await axios.post('/api/',{originalUrl: originalUrl})
      setData(response.data)
      setCopyInputData(response.data.shortUrl)
    } catch (error) {
      console.log("Axios error")
    }
    setIsSubmitting(false)
  }
  const handleClick = (e) =>{
    setIsCopied(true)
    window.navigator.clipboard.writeText(copyInputData);
    inputRef.current?.focus()
  }
  return (
    <>
    <div className="container flex flex-col justify-center items-center h-[100vh] gap-10">
        <div>
        <h1 className="text-4xl sm:text-6xl text-center mb-4">Url Shortner</h1>
        <p className="text-center text-2xl sm:text-3xl">Make your Url&#39;s Shorter</p>
        </div>
        <div>
        <input
        type="text"
        placeholder="Place your Url Here.." 
        className="h-12 rounded-l-md sm:w-[35vw] text-black p-2 focus:outline-none"
        onChange={e=>setOriginalUrl(e.target.value)}
        />
        <button className="text-white bg-blue-400 h-12 rounded-r-md px-2" onClick={handleSubmit}>{isSubmitting?"Working..":"Short Url"}</button>
        </div>
        {data?(<div>
          <input type="text" className="h-8 rounded-l-md focus:outline-none sm:w-[15vw] text-black p-2" onChange={e=>setCopyInputData(e.target.value)} value={copyInputData} id="input" ref={inputRef}/>
          <span className={isCopied?"rounded-r-md bg-green-400 h-8 py-[6px] px-1":"rounded-r-md bg-blue-400 h-8 py-[6px] px-1 cursor-copy"} onClick={handleClick}>{isCopied?'Copied':'Copy'}</span>
        </div>):("")}
    </div>
    </>
  );
}
