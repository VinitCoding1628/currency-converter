import React from 'react'
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

const LoadingState = ({
  title = 'Please wait while we are fetching the data...',
  subtitle = 'This may take a few seconds.',
  size = '45',
  speed = '1.75',
  color = '#5F8DF7',
  containerClassName = '',
  innerClassName = '',
  titleClassName = '',
}) => {
  const content = (
    <div
      className={`flex flex-col justify-center items-center gap-2 bg-gray-50 py-15 rounded-xl border border-gray-100 w-full ${innerClassName}`}
    >
      <Bouncy size={size} speed={speed} color={color} />
      {title && (
        <p className={`text-gray-400 text-center px-14 ${titleClassName || 'text-sm'}`}>
          {title}
        </p>
      )}
      {subtitle && (
        <p className='text-gray-400 text-sm text-center px-14'>
          {subtitle}
        </p>
      )}
    </div>
  )

  if (containerClassName) {
    return (
      <div className={`flex flex-col justify-center items-center ${containerClassName}`}>
        {content}
      </div>
    )
  }

  return content
}

export default LoadingState

