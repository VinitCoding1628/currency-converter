import React from 'react'
import logo from '../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  // Navigate to landing page when logo is clicked
  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <nav className='bg-white px-6 py-4 rounded-3xl sticky mt-3 top-6 z-10 mx-4'>
      <div className='flex justify-start items-center gap-3 hover:cursor-pointer' onClick={handleNavigate}>
        <img src={logo} alt="logo" className='w-8' />
        <div>
          <h2 className='text-lg font-bold'>Xchangeo</h2>
          <p className='text-xs text-gray-400'>Convert • Track • Explore</p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar