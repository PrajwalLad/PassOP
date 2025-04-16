import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-900 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
            <div className="logo font-bold text-2xl">
                <span className="text-red-700">&lt;</span>
                Pass
                <span className="text-red-700">OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='w-7 mx-2' src="icons/heart.png" alt="love" /> by PRAJWAL
            </div>
        </div>
    )
}

export default Footer
