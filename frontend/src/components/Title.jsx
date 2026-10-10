import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex  items-center gap-2 mb-3 text-2xl '>
        <p className='  flex gap-1 sm:gap-2 uppercase text-gray-500' >{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='w-8 sm:w-12  h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title