import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);
  return (
    <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 pt-5 sm:pt-10 lg:pt-14 min-h-[80vh] border-t'>
      {/* --------------left side----------- */}
      <div className='flex flex-col gap-4 w-full lg:max-w-[480px] lg:flex-1'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 '>
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='First name' />
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Last name' />
        </div>
        <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="email" placeholder='Email address' />
      <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Street' />
      <div className='flex flex-col sm:flex-row gap-3 '>
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='City' />
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='State' />
        </div>
         <div className='flex flex-col sm:flex-row gap-3 '>
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="number" placeholder='Zipcode' />
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Country' />
        </div>
          <input className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="number" placeholder='Phone' />

      </div>

      {/* ------right side------- */}
      <div className='mt-0 lg:mt-8 w-full lg:w-auto lg:flex-1'>
        <div className='mt-0 lg:mt-8 w-full min-w-0 sm:min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-8 sm:mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* -------------payment method--- */}
          <div className='flex flex-col sm:flex-row flex-wrap gap-3'>
            {/* ---stripe-------- */}
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-2 sm:gap-3 border p-2 px-3 cursor-pointer min-w-0 flex-1 sm:flex-none'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 max-w-full mx-2 sm:mx-4' src={assets.stripe_logo} alt="" />
            </div>

            {/* ----razorpay------- */}
             <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-2 sm:gap-3 border p-2 px-3 cursor-pointer min-w-0 flex-1 sm:flex-none'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 max-w-full mx-2 sm:mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            {/* ------cash on delivery */}
             <div onClick={()=>setMethod('cod')} className='flex items-center gap-2 sm:gap-3 border p-2 px-3 cursor-pointer min-w-0 flex-1 sm:flex-none'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-xs sm:text-sm font-medium mx-2 sm:mx-4 whitespace-nowrap'> CASH ON DELIVERY</p>
            </div>


          </div>


          <div className='w-full text-end mt-8 '>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white w-full sm:w-auto px-6 sm:px-10 md:px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder