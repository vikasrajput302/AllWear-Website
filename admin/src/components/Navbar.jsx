import React from 'react'
import { assets } from '../assets/assets'


const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2  px-[4%]'>
        <img className='w-[max(7%,80px)] -m-3.5 sm:-m-5.75' src={assets.website_logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm '>logout</button>
    </div>
  )
}

export default Navbar