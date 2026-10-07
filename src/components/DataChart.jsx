import { useState, useEffect, useRef } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import emptyResultImgChart from '../assets/images/empty_state_img_chart.svg'
import LoadingState from './LoadingState'
import Popover from '@mui/material/Popover'
import axios from 'axios'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush } from 'recharts'

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

// Helper to format Date into 'YYYY-MM-DD' for APIs
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

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
  const initialRange = selectionFromPreset('7D')

  // State for the active range, selection, and formatted dates
  const [activeRange, setActiveRange] = useState('7D')
  const [selection, setSelection] = useState(initialRange)
  const [startDate, setStartDate] = useState(formatDate(initialRange.startDate))
  const [endDate, setEndDate] = useState(formatDate(initialRange.endDate))
  const [customAnchorEl, setCustomAnchorEl] = useState(null)
  const [chartData, setChartData] = useState(null)
  const [chartLoading, setChartLoading] = useState(false)
  const isCustomOpen = Boolean(customAnchorEl)
  const timeoutRef = useRef(null)

  // Function for chart data API
  const fetchChartData = async () => {
    if (!fromCurrency || !toCurrency || !startDate || !endDate) return

    setChartLoading(true)
    try {
      const response = await axios.get(
        `https://api.frankfurter.dev/v2/rates?from=${startDate}&to=${endDate}&base=${fromCurrency}&quotes=${toCurrency}`
      )
      setChartData(response.data)
    } catch (error) {
      console.error('Error fetching chart data:', error)
    } finally {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setChartLoading(false)
      }, 500)
    }
  }

  // Use effect to fetch chart data whenever the selection changes
  useEffect(() => {
    fetchChartData()

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [fromCurrency, toCurrency, startDate, endDate])

  // Function to handle custom range popover
  const handleCustomClick = (event) => {
    setCustomAnchorEl(event.currentTarget)
  }

  // Function to handle closing the custom range popover
  const handleCustomClose = () => {
    setCustomAnchorEl(null)
  }

  // Function to choose a preset range
  const choosePreset = (id) => {
    const nextSelection = selectionFromPreset(id)
    const formattedStart = formatDate(nextSelection.startDate)
    const formattedEnd = formatDate(nextSelection.endDate)

    setActiveRange(id)
    setSelection(nextSelection)
    setStartDate(formattedStart)
    setEndDate(formattedEnd)
  }

  // Parse and format chart data safely for Recharts
  const formattedChartData = Array.isArray(chartData)
    ? chartData.map((item) => ({
      date: item.date,
      rate:
        typeof item.rate === 'number'
          ? item.rate
          : item.quotes?.[toCurrency] ??
          item.rates?.[toCurrency] ??
          item[toCurrency] ??
          null,
    }))
    : chartData?.rates
      ? Object.entries(chartData.rates).map(([date, rates]) => ({
        date,
        rate: typeof rates === 'number' ? rates : rates?.[toCurrency] ?? null,
      }))
      : []


  // Custom X axis 
  const CustomXAxisTick = ({ x, y, payload }) => {
    const date = new Date(payload.value)

    const dayMonth = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })

    const year = date.getFullYear()

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          textAnchor='middle'
          fill='#94a3b8'
          fontSize={12}
        >
          <tspan x='0' dy='0'>
            {dayMonth}
          </tspan>

          <tspan x='0' dy='16'>
            {year}
          </tspan>
        </text>
      </g>
    )
  }

  return (
    <>
      {
        fromCurrency !== null && toCurrency !== null && !loading && (
          <div className='bg-white xl:w-[130%] w-full rounded-xl p-4 shadow-md flex flex-col'>
            {/* Title */}
            <div className=''>
              <h2 className='font-semibold text-2xl'>
                {fromCurrency} to {toCurrency}{' '}
                <span className='text-primary-color'>Exchange Rate</span>
              </h2>
              <p className='text-gray-400'>Track the latest exchange rates and historical trends.</p>
            </div>

            {/* Dates */}
            <div className='mt-6 flex items-center justify-between rounded-full bg-[#f4f7fb] p-1.5 w-fit'>
              {RANGES.map((item) => {
                if (item.id === 'Custom') {
                  return (
                    <div key={item.id}>
                      <button
                        type='button'
                        onClick={handleCustomClick}
                        className={`min-w-14 rounded-full px-4 py-2 text-sm font-semibold transition ${activeRange === 'Custom'
                          ? 'bg-primary-color text-white'
                          : 'text-slate-600'
                          }`}
                      >
                        {item.label}
                      </button>
                      <Popover
                        open={isCustomOpen}
                        anchorEl={customAnchorEl}
                        onClose={handleCustomClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        slotProps={{
                          paper: {
                            sx: {
                              mt: 1,
                              borderRadius: '16px',
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                              overflow: 'hidden',
                            },
                          },
                        }}
                      >
                        <DateRange
                          ranges={[selection]}
                          onChange={(item) => {
                            const nextStart = formatDate(item.selection.startDate)
                            const nextEnd = formatDate(item.selection.endDate)
                            setSelection(item.selection)
                            setActiveRange('Custom')
                            setStartDate(nextStart)
                            setEndDate(nextEnd)
                          }}
                          months={1}
                          direction='horizontal'
                          maxDate={new Date()}
                          minDate={new Date('1999-01-04')}
                          rangeColors={['#5F8DF7']}
                          showDateDisplay={false}
                          moveRangeOnFirstSelection={false}
                        />
                      </Popover>
                    </div>
                  )
                }

                return (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => choosePreset(item.id)}
                    className={`min-w-14 rounded-full px-4 py-2 text-sm font-semibold transition ${activeRange === item.id
                      ? 'bg-primary-color text-white'
                      : 'text-slate-600'
                      }`}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>

            {/* Chart Area / Loading */}
            {
              chartLoading ? (
                // Loading State
                <div className='mt-6 w-full flex-1'>
                  <LoadingState
                    innerClassName='h-full w-full'
                    title='Please wait while we are fetching the data...'
                    titleClassName='text-xl font-semibold'
                    subtitle='This may take a few seconds.'
                  />
                </div>
              ) : formattedChartData.length > 0 ? (
                // Chart Area
                <div className='mt-6 w-full h-96'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart
                      data={formattedChartData}
                      // margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                      margin={{
                        top: 10,
                        right: 75,
                        left: 30,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid stroke='#f1f5f9' strokeDasharray='3 3' />
                      <XAxis
                        dataKey='date'
                        stroke='#94a3b8'
                        fontSize={12}
                        tickLine={false}
                        minTickGap={30}
                        tickMargin={18}
                        tick={<CustomXAxisTick />}
                      />
                      <YAxis
                        domain={['auto', 'auto']}
                        stroke='#94a3b8'
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                        formatter={(value) => [Number(value).toFixed(4), 'Rate']}
                      />
                      <Line
                        type='monotone'
                        dataKey='rate'
                        stroke='#5F8DF7'
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#5F8DF7' }}
                      />
                      {formattedChartData.length > 1 && (
                        <Brush
                          dataKey='date'
                          height={28}
                          travellerWidth={8}
                          stroke='#5F8DF7'
                          fill='#f8fafc'
                          dy={24}
                          tickFormatter={(date) => {
                            const d = new Date(date)

                            return d.toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                            })
                          }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className='mt-6 flex flex-col justify-center items-center py-16 text-gray-400'>
                  <p>No historical exchange data available for this range.</p>
                </div>
              )
            }
          </div>
        )
      }

      {/* Showing default state */}
      {
        (fromCurrency === null || toCurrency === null) && !loading && (
          <div className='bg-white xl:w-[130%] w-full rounded-2xl p-4 shadow-md flex flex-col'>
            <div className='flex flex-1 flex-col justify-center items-center gap-2 bg-gray-50 rounded-xl border border-gray-100 xl:h-auto xl:py-0 md:py-16 sm:py-20 py-20 xl:px-0 md:px-5 sm:px-10 px-4'>
              <img src={emptyResultImgChart} alt="empty-result-img" className='xl:w-1/3 md:w-[40%] sm:w-1/2 w-full' />
              <h2 className='font-semibold text-gray-500 text-2xl text-center'>Select currencies to see the conversion result</h2>
              <p className='text-gray-400 text-lg text-center px-14'>Choose a currency pair from the dropdown to see the latest exchange rate, conversion result and historical trends.</p>
            </div>
          </div>
        )
      }

      {/* Loading State */}
      {
        (loading) && (
          <LoadingState
            containerClassName='p-4 rounded-xl bg-white xl:w-[130%] w-full shadow-md'
            innerClassName='w-full h-full'
            title='Please wait while we are fetching the data...'
            titleClassName='text-2xl font-semibold'
            subtitle='This may take a few seconds.'
          />
        )
      }
    </>
  )
}

export default DataChart