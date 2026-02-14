import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
const HomeTest = ({obj}) => {
  return (
    <div className=' md:flex xs:flex-col  md:items-center md:justify-evenly  md:px-20 xs:px-6  '>
          <img src={obj.img}
          height={300} width={320} className='mx-auto'/>
         
         
         
          <div className='Test flex flex-col  gap-2 sm:w-1/2 mx-auto px-5 pt-4'>

            <div className='h-10 w-10 rounded-full bg-yellow-400 relative'>
            <FaQuoteLeft className="absolute top-3 right-3 " />
            </div>
        
           <p >"{obj.review}"</p>
               
          </div>


    </div>
  )
}

export default HomeTest;