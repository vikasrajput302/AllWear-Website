import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
const initPay = (order) =>{
  const options = {
    key : import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name : 'Order Payment',
    description : 'Order Payment',
    order_id : order.id,
    receipt : order.receipt,
    handler : async (response) => {
      console.log(response);
      try {
        const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
        if (data.success) {
          navigate('/orders')
          setCartItems({})
        }
      } catch (error) {
        console.log(error);
        toast.error(error.mesaage)
        
      }
    }

  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}



  const onSubmitHandler = async (e) => {
    e.preventDefault();
     try{
        let OrderItems = []
        for(const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item] > 0){
              const itemInfo = structuredClone(products.find(product => product._id === items))
              if (itemInfo) {
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                OrderItems.push(itemInfo)
              }
            }
          }
        }
        let orderData = {
          address : formData,
          items:OrderItems,
          amount : getCartAmount() + delivery_fee
        }
        switch (method) {

          //api calls for cod
          case "cod":
            const response = await axios.post(backendUrl + '/api/order/place-order', 
              orderData,{headers:{token}})
              if (response.data.success) {
                setCartItems({})
                navigate('/orders')
              }else{
                toast.error(response.data.mesaage)
              }
            break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/place-order-stripe',orderData,{headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.mesaage)
          }
          break;

          case 'razorpay':
            const responseRazorpay = await axios.post(backendUrl + '/api/order/place-order-razorpay',orderData,{headers:{token}})
            if (responseRazorpay.data.success) {
              initPay(responseRazorpay.data.order);
              
            }
            break;
          default:
            break;
        }
     }catch(err){
      console.log(err);
      toast.error(err.mesaage)
     }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 pt-5 sm:pt-10 lg:pt-14 min-h-[80vh] border-t'>
      {/* --------------left side----------- */}
      <div className='flex flex-col gap-4 w-full lg:max-w-120 lg:flex-1'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex flex-col sm:flex-row gap-3 '>
          <input onChange={onChangeHandler} name ='firstName' value={formData.firstName} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='First name' />
          <input onChange={onChangeHandler} name ='lastName' value={formData.lastName} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Last name' />
        </div>
        <input onChange={onChangeHandler} name ='email' value={formData.email} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="email" placeholder='Email address' />
      <input onChange={onChangeHandler} name ='street' value={formData.street} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Street' />
      <div className='flex flex-col sm:flex-row gap-3 '>
          <input onChange={onChangeHandler} name ='city' value={formData.city} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='City' />
          <input onChange={onChangeHandler} name ='state' value={formData.state} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='State' />
        </div>
         <div className='flex flex-col sm:flex-row gap-3 '>
          <input onChange={onChangeHandler} name ='zipcode' value={formData.zipcode} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="number" placeholder='Zipcode' />
          <input onChange={onChangeHandler} name ='country' value={formData.country} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="text" placeholder='Country' />
        </div>
          <input onChange={onChangeHandler} name ='phone' value={formData.phone} required className='border border-gray-300 rounded py-2 px-3 sm:px-3.5 w-full min-w-0 text-base' type="number" placeholder='Phone' />

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
            <button type='submit' className='bg-black text-white w-full sm:w-auto px-6 sm:px-10 md:px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder