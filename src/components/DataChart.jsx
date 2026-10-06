import { React, useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import emptyResultImgChart from '../assets/images/empty_state_img_chart.svg'

// Preset ranges
const RANGES = [
  { id: '1D', label: '1D', days: 1 },
  { id: '7D', label: '7D', days: 7 },
  { id: '1M', label: '1M', months: 1 },
  { id: '3M', label: '3M', months: 3 },
  { id: '1Y', label: '1Y', years: 1 },
  { id: '5Y', label: '5Y', years: 5 },
  { id: 'Custom', label: 'Custom' },
]

// Function to select a preset range
const selectionFromPreset = (id) => {
  const endDate = new Date()
  const startDate = new Date()
  const preset = RANGES.find((item) => item.id === id)
  if (preset.days) startDate.setDate(endDate.getDate() - preset.days)
  if (preset.months) startDate.setMonth(endDate.getMonth() - preset.months)
  if (preset.years) startDate.setFullYear(endDate.getFullYear() - preset.years)
  if (id === 'Custom') startDate.setTime(new Date('1999-01-04').getTime())
  return { startDate, endDate, key: 'selection' }
}

const DataChart = ({ fromCurrency, toCurrency, amount, loading }) => {
  // State for the active range and selection
  const [activeRange, setActiveRange] = useState('1Y')
  const [selection, setSelection] = useState(selectionFromPreset('1Y'))

  // Function to choose a preset range
  const choosePreset = (id) => {
    setActiveRange(id)
    setSelection(selectionFromPreset(id))
  }
  return (
    <>
      {
        fromCurrency !== null && toCurrency !== null && !loading && (
          <>
            {/* Title */}
            <div className='bg-white xl:w-[130%] w-full rounded-xl p-4 shadow-md flex flex-col'>
              <h2 className='font-semibold text-2xl'>
                {fromCurrency} to {toCurrency}{' '}
                <span className='text-primary-color'>Exchange Rate</span>
              </h2>
              <p className='text-gray-400'>Track the latest exchange rates and historical trends.</p>
              <div className='mt-6 flex items-center justify-between rounded-full bg-[#f4f7fb] p-1.5'>
                {RANGES.map((item) => (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => choosePreset(item.id)}
                    className={`min-w-14 rounded-full px-4 py-2 text-sm font-semibold ${activeRange === item.id
                      ? 'bg-primary-color text-white'
                      : 'text-slate-600'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <DateRange
                ranges={[selection]}
                onChange={(item) => {
                  setSelection(item.selection)
                  setActiveRange(null)
                }}
                months={1}
                direction='horizontal'
                maxDate={new Date()}
                minDate={new Date('1999-01-04')}
                rangeColors={['#5F8DF7']}
                showDateDisplay={false}
                moveRangeOnFirstSelection={false}
              />
            </div>
          </>
        )
      }

      {/* Showing default state */}
      {
        (fromCurrency === null || toCurrency === null || loading) && (
          <div className='bg-white xl:w-[130%] w-full rounded-2xl p-4 shadow-md flex flex-col'>
            <div className='flex flex-1 flex-col justify-center items-center gap-2 bg-gray-50 rounded-xl border border-gray-100 xl:h-auto xl:py-0 md:py-16 sm:py-20 py-20 xl:px-0 md:px-5 sm:px-10 px-4'>
              <img src={emptyResultImgChart} alt="empty-result-img" className='xl:w-1/3 md:w-[40%] sm:w-1/2 w-full' />
              <h2 className='font-semibold text-gray-500 text-2xl text-center'>Select currencies to see the conversion result</h2>
              <p className='text-gray-400 text-lg text-center px-14'>Choose a currency pair from the dropdown to see the latest exchange rate, conversion result and historical trends.</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default DataChart