import React from 'react'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-2 pt-10 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70 '>
      <div className='flex justify-center items-center gap-2'>
        <div>
          <h1 className='text-home-heading  relative font-bold text-gray-800 max-w-3xl mx-auto '>Empower your future with the course designed to <span className='text-blue-600'> fit your choice.</span> </h1>

          <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>We bring together world-class instructors, interactive content, and a supportive community to help you achieve your perssonal and professional goals.</p>

          <p className='md:hidden text-gray-500 max-w-sm mx-auto'>We bring together world-class instructors to help you achieve your perssonal and professional goals. </p>
        </div>

        <div className='w-[30%] hidden lg:block'>
          <img src='/development.png' alt="" />
        </div>

      </div>
      <SearchBar />
    </div>

  )
}

export default Hero
