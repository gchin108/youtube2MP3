"use client"
import { FaYoutube } from "react-icons/fa";

import { useState } from "react"

const ENDPOINT = "https://youtube-mp36.p.rapidapi.com/dl"

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.API_HOST
  }
};
function extractString(url) {
  // Split the URL by "&" to separate different parameters
  const params = url.split('&');

  for (let i = 0; i < params.length; i++) {
    // Split each parameter by "="
    const keyValue = params[i].split('=');

    // Check if the key is "v" (for YouTube video IDs)
    if (keyValue[0] === 'v' || keyValue[0].endsWith('?v')) {
      return keyValue[1];
    }
  }

  // Return null if the desired parameter is not found
  return null;
}

export default function App() {
  const [success, setSuccess] = useState(null)
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [error, setError] = useState(null)

  async function handleConvert() {
    const id = extractString(url)
    console.log(id)
    if (id === null) {
      setError("invalid url")
      setSuccess(false)
    }
    else {
      try {
        const response = await fetch(`${ENDPOINT}?id=${id}`, options)

        const data = await response.json();
        if (data.status !== "fail") setSuccess(true)
        else {
          setSuccess(false)
          setError("Invalid URL")
        }
        console.log(data.error)
        setTitle(data.title)
        setLink(data.link)
      } catch (err) {
        console.log(err)
      }
    }
  }
  async function handleReset() {
    setSuccess(null);
    setUrl("")
    setTitle("")
    setLink("")
    setError("");
  }
  return (
    <div className="flex justify-center items-center h-[30vh] flex-col gap-4">
      <h1 className="text-xl font-bold flex items-center gap-1"><span><FaYoutube /></span>Youtube 2 Mp3 Converter</h1>
      <div className="flex flex-col gap-2">
        <input placeholder='enter url' className="text-black p-2  rounded-lg w-[400px]" onChange={(e) => setUrl(e.target.value)} value={url} />
        <p>{error || title}</p>
        <div className="flex gap-2">
          {success === null && <button className="btn-convert w-fit" onClick={handleConvert}>
            convert
          </button>}
          {success && (
            <div onClick={handleReset}><a href={link}><button className="btn-download">Download</button></a></div>)}
          {(link || (success === false && error !== "")) && <button className="btn-convert w-fit" onClick={handleReset}>Reset</button>}
        </div>
      </div>
    </div>
  )
}
