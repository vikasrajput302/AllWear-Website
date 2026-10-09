import React from 'react'
import { assets } from '../assets/assets'
import {MoveRight} from "lucide-react"

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row  border border-gray-400 '>
        {/* left hero section */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0  ' >
          <div className='text-[#414141]'>
             
            <h1 className='playfair-display text-3xl lg:text-5xl '>Your Style</h1>
            <h1 className='playfair-display text-3xl lg:text-5xl '>Your Rules</h1>
            <h1 className='playfair-display text-3xl lg:text-5xl '>Your Allwear</h1>
             <div className='flex items-center gap-2 py-3 '>
                <p className='uppercase font-medium text-sm md:text-base'>Wear Your Own Story</p>
                <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
            </div>
            <div  className='flex items-center gap-2 '>
                <button className=' flex items-center justify-center  bg-black text-white border-none rounded-xl px-2 py-2 gap-2   text-sm md:text-base'>Shop Collection <MoveRight/></button>
                
            </div>
          </div>
        </div>
        {/* right hero section */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero