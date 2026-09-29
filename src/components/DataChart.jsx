import React from 'react'
import titleLogoImg from '../assets/images/title_logo.svg'

const DataChart = () => {
  return (
    <div className='bg-white w-full rounded-xl p-4 shadow-md'>
        {/* Title */}
        <div>
            <img src={titleLogoImg} alt="title-logo" className='w-10'/>
            <div>
                <h2>Currency Converter</h2>
                <p>Get real-time exchange rates and convert instantly.</p>
            </div>
        </div>
    </div>
  )
}

export default DataChart