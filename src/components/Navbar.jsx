import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white '>
      <div className='flex justify-between px-4 h-14 items-center mycontainer py-5'>
      <div className="logo font-bold text-2xl">
        <span className="text-red-700">&lt;</span>
        Pass
        <span className="text-red-700">OP/&gt;</span>
      </div>
      <a href="https://github.com/PrajwalLad" target="_blank" rel="noopener noreferrer">
        <button className='text-white bg-red-900 my-5 rounded-full flex justify-between items-center cursor-pointer ring-1 ring-white'>
          <img className='w-10 p-1' src="icons/github-mark-white.svg" alt="GitHub logo" />
          <span className='font-bold px-2'>GitHub</span>
        </button></a>
      </div>
    </nav>
  )
}

export default Navbar
