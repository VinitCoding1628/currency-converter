import React from 'react'
import Navbar from '../components/Navbar'
import heroImage from '../assets/images/hero_img.svg'
import { Button } from '@heroui/react';
import { RiArrowRightLongFill } from "react-icons/ri";
import { GiElectric } from "react-icons/gi";
import { FiGlobe } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
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

  const navigateToConverter = () => {
    navigate('/converter')
  }

  return (
    <div className='px-4'>
      {/* Hero Section */}
      <section className='mt-15 mb-15 flex flex-col items-center justify-center lg:flex-row lg:justify-between'>
        <div className='lmt-12 flex w-full flex-col items-center gap-4 text-center lg:w-1/2 lg:items-start lg:text-left'>
          <h1 className='text-6xl font-extrabold leading-18'>Instant Global <span className='bg-linear-to-r from-primary-color to-secondary-color bg-clip-text text-transparent'>Currency Exchange</span></h1>
          <p className='text-xl text-gray-500 leading-8 md:w-full sm:w-full w-full'>Get accurate and up-to-date exchange rates, convert currencies instantly, <br className='lg:block hidden'/> and track historical trends — all in one simple, powerful experience <br className='lg:block hidden'/> powered by <b>Xchangeo.</b></p>
          <Button onClick={navigateToConverter} className='lg:text-base flex items-center justify-center text-base bg-linear-to-r from-primary-color to-secondary-color p-6 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out mt-4'>
            Try Converter <RiArrowRightLongFill className='text-4xl' />
          </Button>
        </div>
        <img src={heroImage} alt="hero-img" className='lg:w-150 md:w-130 sm:w-100 w-full lg:pe-22 lg:pt-0 md:pt-10 sm:pt-10 pt-10' />
      </section>

      {/* Features section */}
      <section className='my-10 rounded-4xl border border-gray-200 feature-bg px-4 py-12 sm:px-6 lg:px-8'>
        <div>
          <div className='flex items-center justify-center gap-2'>
            <hr className='w-10 rounded border border-gray-400' />
            <h2 className='text-xl font-bold text-slate-600'>Features</h2>
            <hr className='w-10 rounded border border-gray-400' />
          </div>
          <div className='mt-10 flex flex-col items-stretch gap-6 md:flex-row md:flex-wrap md:justify-center lg:flex lg:justify-evenly'>
            {
              features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div key={index} className='flex w-full flex-col items-start justify-start gap-2 rounded-xl bg-white p-6 shadow-md md:w-[calc(50%-0.75rem)] lg:w-auto lg:max-w-sm lg:flex-1'>
                    <Icon className={`${feature.iconColor} rounded-lg p-4 text-6xl`} style={{ backgroundColor: feature.iconBgColor }} />
                    <h3 className='text-lg font-bold'>{feature.title}</h3>
                    <p className='text-sm text-gray-500'>{feature.description}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className='py-16 sm:py-24'>
        <div className='flex items-center justify-center gap-2'>
          <hr className='w-10 rounded border border-gray-400' />
          <h2 className='text-center text-xl font-bold text-slate-600'>How it works</h2>
          <hr className='w-10 rounded border border-gray-400' />
        </div>
        <div className='my-10 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center'>
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className='flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-1'>
                <span
                  className={`${step.numberColor} flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold`}
                  style={{ backgroundColor: step.numberBgColor }}
                >
                  {step.number}
                </span>
                <div>
                  <h3 className='font-bold'>{step.title}</h3>
                  <p className='mt-1 text-sm text-gray-500'>{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <RiArrowRightLongFill className='shrink-0 rotate-90 self-center text-xl text-gray-400 lg:rotate-0' aria-hidden='true' />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage