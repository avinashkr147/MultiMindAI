import React, { useState } from 'react'
import logo from "../assets/logo.svg";
import Markdown from 'react-markdown';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ClipboardCheck, Edit, Sparkle, Sparkles } from 'lucide-react';
import toast from "react-hot-toast";
import { Copy,Clipboard  } from "lucide-react";
import Footer from '../components/Footer';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function WriteArticle() {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]


  const navigate = useNavigate()
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [copied, setCopied] = useState(false);

  // copy
  const copyText = async () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      toast.success("Text Copied to Clipboard..!")
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className='h-full p-6 flex justify-center items-start flex-wrap gap-4 text-slate-700'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 '>
        <img className='cursor-pointer w-32 sm:w-44' src={logo} alt="" onClick={() => navigate('/')} />
      </nav>
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>

        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of artificial intelligence is...' required />

        <p className='mt-4 text-sm font-medium'>Article Length</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item, index) => (
            <span onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item.text}</span>
          ))}
        </div>
        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              : <Edit className='w-5' />
          }
          Generate article
        </button>
      </form>

      {/* Right col */}

      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>

        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated article</h1>
        </div>

        {!content ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click “Generate article ” to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
            <div className='reset-tw'>
              
              <div className='bg-red-700'>
                <button
                onClick={copyText}
                className="flex items-end text-center gap-2 px-2 py-2 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-700 transition"
              >
                {copied ? <ClipboardCheck   size={18} /> : <Clipboard size={18} />}
                {copied ? "Copied!" : "Copy"}
              </button>
                </div>
                
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default WriteArticle