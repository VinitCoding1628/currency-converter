import React from 'react'
import Navbar from '../components/Navbar'
import heroImage from '../assets/images/hero_img.svg'
import { Button } from '@heroui/react';
import { RiArrowRightLongFill } from "react-icons/ri";
import { GiElectric } from "react-icons/gi";
import { FiGlobe } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";

const LandingPage = () => {
  const features = [
    {
      icon: GiElectric,
      iconColor: 'text-primary-color',
      iconBgColor: '#E4EBFC',
      title: 'Live Exchange Rates',
      description: 'Get the latest conversion rates instantly.'
    },
    {
      icon: FiGlobe,
      title: 'Diverse Currency Support',
      iconColor: 'text-secondary-color',
      iconBgColor: '#DFEFF7',
      description: 'Supports major and rare currencies worldwide.'
    },
    {
      icon: ImStatsBars,
      title: 'Historical Data',
      iconColor: 'text-tertiary-color',
      iconBgColor: '#E9E5FD',
      description: 'Track currency trends over time.'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Enter Amount',
      description: 'Type the amount you want to convert.',
      numberColor: 'text-primary-color',
      numberBgColor: '#E4EBFC',
    },
    {
      number: '2',
      title: 'Select Currencies',
      description: 'Choose the from and to currencies.',
      numberColor: 'text-secondary-color',
      numberBgColor: '#DFEFF7',
    },
    {
      number: '3',
      title: 'View Live Rate',
      description: 'See the current exchange rate instantly.',
      numberColor: 'text-tertiary-color',
      numberBgColor: '#E9E5FD',
    },
    {
      number: '4',
      title: 'Click Convert',
      description: 'Get your converted amount in seconds.',
      numberColor: 'text-amber-600',
      numberBgColor: '#FBF3D0',
    },
  ]
  return (
    <div className=''>
      <Navbar />

      {/* Hero Section */}
      <section className='mt-15 flex justify-between items-center'>
        <div className='w-1/2 flex flex-col gap-4 mt-12'>
          <h1 className='text-6xl font-extrabold leading-18'>Instant Global <span className='bg-linear-to-r from-primary-color to-secondary-color bg-clip-text text-transparent'>Currency Exchange</span></h1>
          <p className='text-xl text-gray-500 leading-8 w-170'>Get accurate and up-to-date exchange rates, convert currencies instantly, and track historical trends — all in one simple, powerful experience powered by <b>Xchangeo.</b></p>
          <Button className='bg-linear-to-r from-primary-color to-secondary-color p-6 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out mt-4'>
            Try Converter <RiArrowRightLongFill className='text-2xl' />
          </Button>
        </div>
        <img src={heroImage} alt="hero-img" className='w-1/3 pe-22' />
      </section>

      {/* Features section */}
      <section className='py-12 feature-bg border border-gray-200 rounded-4xl my-10'>
        <div>
          <div className='flex items-center justify-center gap-2'>
            <hr className='w-10 border rounded border-gray-400' />
            <h2 className='text-xl text-slate-600 font-bold'>Features</h2>
            <hr className='w-10 border rounded border-gray-400' />
          </div>
          <div className='flex justify-evenly items-center mt-10'>
            {
              features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div key={index} className='flex flex-col items-start justify-start gap-2 bg-white rounded-xl shadow-md p-6 w-110'>
                    <Icon className={`${feature.iconColor} p-4 text-6xl rounded-lg`} style={{ backgroundColor: feature.iconBgColor }} />
                    <h3 className='text-lg font-bold'>{feature.title}</h3>
                    <p className='text-gray-500 text-sm'>{feature.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className='my-16 pb-10'>
      <div className='flex items-center justify-center gap-2'>
            <hr className='w-10 border rounded border-gray-400' />
            <h2 className='text-xl text-slate-600 font-bold'>How it works</h2>
            <hr className='w-10 border rounded border-gray-400' />
          </div>
        <div className='flex items-center gap-3 my-10'>
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className='flex flex-1 items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4'>
                <span
                  className={`${step.numberColor} flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold`}
                  style={{ backgroundColor: step.numberBgColor }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className='font-bold'>{step.title}</h3>
                  <p className='text-sm text-gray-500 mt-1'>{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <RiArrowRightLongFill className='shrink-0 text-xl text-gray-400' aria-hidden='true' />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage