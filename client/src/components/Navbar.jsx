import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.svg";
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  return (
    <div className='fixed z-5 w-full h-[12%] backdrop-blur-2xl flex justify-between  items-center text-center mt-0 py-4 px-4 sm:px-20 xl:px-32  '>
      <img src={logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => navigate('/')} />
      <div className="flex items-center gap-4">
         <button onClick={() => navigate('/ai')} className='flex  items-center gap-2 rounded-2xl text-[10px] cursor-pointer bg-primary text-white px-1 py-1   sm:px-3 sm:py-2.5'>Dashboard <ArrowRight className='w-1 h-1 sm:w-4 sm:h-4' /></button>
        {
          user ? <UserButton />
            : (
              <button onClick={openSignIn} className='flex items-center gap-2 rounded-2xl text-[10px] cursor-pointer bg-primary text-white px-1 py-1   sm:px-3 sm:py-2.5'>Get Started <ArrowRight className='w-1 h-1 sm:w-4 sm:h-4' /></button>

            ) 
        }

      </div>

    </div>
  )
}

export default Navbar