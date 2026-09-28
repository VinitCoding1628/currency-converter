import React from 'react'
import logo from '../assets/images/logo.svg'

const Footer = () => {
  return (
    <footer className='bg-gray-100 border-t-2 border-gray-300 px-8 py-4 flex justify-between items-center'>
        <div className=' flex justify-start items-center gap-4'>
            <img src={logo} alt="logo" />
            <div>
            <h2 className='text-lg font-bold'>Xchangeo</h2>
            <p className='text-xs text-gray-400'>Convert • Track • Explore</p>
            </div>
        </div>
        <p className='text-sm'>© 2025 Xchangeo Inc. All rights reserved - <a href="https://www.artfolio.tech/vinitgite" target='_blank' className='text-blue-500 hover:text-blue-600 hover:underline transition-all duration-300 ease-in-out'>Vinit Gite</a></p>
    </footer>
  )
}

export default Footer