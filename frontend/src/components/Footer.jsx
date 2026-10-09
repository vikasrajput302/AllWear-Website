import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div className=''>
                <img src={assets.website_logo} className='mt-[-50px] ml-[-20px] w-30' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    At AllWear, we believe fashion is more than what you wear. Discover versatile styles, everyday essentails, and timeless trends that express your individaulity and inspire confidence in every moment.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 8168753832</li>
                    <li>vr9188794@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026@ AllWear.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer