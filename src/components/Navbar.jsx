import React from 'react'
import logo from '../assets/images/logo.svg'

const Navbar = () => {
  return (
    <nav className='bg-white px-8 py-4 rounded-3xl sticky mx-5 mt-5 top-10 z-10 flex justify-start items-center gap-4'>
        <img src={logo} alt="logo" className='w-8'/>
        <div>
            <h2 className='text-lg font-bold'>Xchangeo</h2>
            <p className='text-xs text-gray-400'>Convert • Track • Explore</p>
        </div>
    </nav>
  )
}

export default Navbar