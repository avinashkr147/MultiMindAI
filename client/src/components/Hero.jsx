import React from 'react'
import user_group from "../assets/user_group.png";
import { useClerk,useUser} from '@clerk/clerk-react'
import { ArrowDown } from 'lucide-react'

function Hero() {
const { openSignIn } = useClerk()
const {user} = useUser()

const handleScrollDown = () => {
  window.scrollTo({
    top: window.scrollY + 600,  // scroll down 500px
    behavior: "smooth",
  });
  
};

    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <div className='text-center mb-3 -mt-20'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
                    Drive innovation <br /> with <span className='text-primary'>AI excellence</span>
                </h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
                    Transform your workflow with cutting-edge AI technology designed to boost creativity, accuracy, and performance.
                </p>

            </div>

            <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                <img src={user_group} alt='' className='h-8'/> Trusted by 5k+ people
            </div>
            <div className='w-full mt-6 '>
            {
            user ? <button onClick={handleScrollDown}  className=' flex items-center justify-center text-center m-auto w-[200px]  text-2xl  rounded-xl  cursor-pointer bg-primary text-white px-2 py-2  sm:px-4 sm:py-4 '>Scroll <h1 className='ml-3 mt-1 animate-bounce'>< ArrowDown/></h1></button> :
             <button onClick={openSignIn} className=' flex items-center justify-center text-center m-auto w-[200px]  text-2xl  rounded-xl  cursor-pointer bg-primary text-white px-2 py-2  sm:px-4 sm:py-4 '>Get Started</button>
            }
            </div>
        </div>
    )
}

export default Hero