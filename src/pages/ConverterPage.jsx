import React, { useEffect, useRef, useState } from 'react'
import titleLogoImg from '../assets/images/title_logo.svg'
import axios from 'axios'
import { Autocomplete, Button, TextField } from '@mui/material'
import { BsDash } from 'react-icons/bs'
import { FaExchangeAlt } from 'react-icons/fa'
import { FiCheck, FiCopy } from 'react-icons/fi'
import emptyResultImg from '../assets/images/bar_chart_icon.svg'
import DataChart from '../components/DataChart'
import { gooeyToast } from 'goey-toast'
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'

const formatAmount = (value) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const formatUpdated = (date) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

const ConverterPage = () => {
  const [getCurrencies, setGetCurrencies] = useState([])
  const [fromCurrency, setFromCurrency] = useState(null)
  const [toCurrency, setToCurrency] = useState(null)
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Get currencies from the API
  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('https://api.frankfurter.dev/v2/currencies')
      const data = response.data;
      setGetCurrencies(data)
    } catch (error) {
      console.error('Error while fetching currencies', error);
    }
  }

  // Fetch Currencies and Clear Timeout
  useEffect(() => {
    fetchCurrencies()
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  // Convert Currency Function
  const convertCurrency = async () => {
    if (!fromCurrency || !toCurrency || !amount) return
    setLoading(true);
    try {
      const response = await axios.get(`https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`)
      const data = response.data
      const numericAmount = Number(amount)
      const fromDate = new Date()
      fromDate.setDate(fromDate.getDate() - 7)
      const historyStart = fromDate.toISOString().slice(0, 10)
      const history = await axios.get(
        `https://api.frankfurter.dev/v2/rates?base=${fromCurrency}&quotes=${toCurrency}&from=${historyStart}`
      )
      const series = history.data
      const previous = series.length > 1 ? series[series.length - 2].rate : null
      const changePercent = previous
        ? ((data.rate - previous) / previous) * 100
        : null

      setResult({
        rate: data.rate,
        base: data.base,
        quote: data.quote,
        amount: numericAmount,
        converted: data.rate * numericAmount,
        changePercent,
        updatedAt: new Date(),
      })
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000)

      return () => { clearTimeout(timeout) }
    } catch (error) {
      console.error('Error while converting currency', error)
    }
  }

  // Copy Converted Amount Function
  const copyConvertedAmount = async () => {
    if (!result) return
    try {
    } catch (error) {
      console.error('Error while copying converted amount', error)
      return
    }
    gooeyToast.success('Copied', {
      duration: 4000,
      showTimestamp: false,
    })
    setCopied(true)
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 4000)
  }

  return (
    <section className='flex xl:flex-row lg:flex-col md:flex-col sm:flex-col flex-col justify-center items-center gap-5 px-6 pt-20 pb-10'>
      {/* Converter */}
      <div className='bg-white xl:w-[60%] lg:w-full md:w-[90%] sm:w-full w-full rounded-xl p-5 shadow-md flex flex-col justify-center gap-4'>
        {/* Title */}
        <div className='flex items-center gap-4'>
          <img src={titleLogoImg} alt="title-logo" className='w-12' />
          <div>
            <h2 className='font-semibold text-2xl'>Currency <span className='text-primary-color'>Converter</span></h2>
            <p className='text-gray-400'>Get real-time exchange rates and convert instantly.</p>
          </div>
        </div>

        {/* Selection */}
        <div className='flex justify-center items-center gap-4'>
          {/* From Currency */}
          <Autocomplete
            className='w-full'
            options={getCurrencies}
            value={
              getCurrencies.find((item) => item.iso_code === fromCurrency) ?? null
            }
            onChange={(_, selectedOption) => {
              setFromCurrency(selectedOption?.iso_code ?? '')
            }}
            getOptionLabel={(option) => `${option.iso_code} - ${option.name}`}
            isOptionEqualToValue={(option, value) =>
              option.iso_code === value.iso_code
            }
            renderInput={(params) => (
              <TextField {...params} label="From Currency" margin="normal" />
            )}
          />

          <p className='bg-gray-100 text-primary-color p-2 rounded-full text-2xl font-bold'><BsDash /></p>

          {/* To Currency */}
          <Autocomplete
            className='w-full'
            options={getCurrencies}
            value={
              getCurrencies.find((item) => item.iso_code === toCurrency) ?? null
            }
            onChange={(_, selectedOption) => {
              setToCurrency(selectedOption?.iso_code ?? '')
            }}
            getOptionLabel={(option) => `${option.iso_code} - ${option.name}`}
            isOptionEqualToValue={(option, value) =>
              option.iso_code === value.iso_code
            }
            renderInput={(params) => (
              <TextField {...params} label="To Currency" margin="normal" />
            )}
          />
          <div></div>
        </div>

        {/* Amount */}
        <div className='flex justify-center items-center pe-4'>
          <TextField
            type="number"
            label="Amount"
            margin="normal"
            className="w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            slotProps={{
              htmlInput: { min: 0 },
            }}
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }}
          />
        </div>

        {/* Convert Button */}
        <div>
          <Button
            variant='contained'
            className={`w-full lg:text-base flex items-center gap-4 shadow-md! py-3! font-semibold rounded-xl! hover:scale-100 hover:shadow-lg transition-all duration-300 ease-in-out! mt-4 text-base! ${loading || !fromCurrency || !toCurrency || !amount ? 'opacity-50 cursor-not-allowed bg-gray-200!' : 'bg-linear-to-r from-primary-color to-secondary-color shadow-primary-color/50!'}`} sx={{ textTransform: 'capitalize' }}
            onClick={convertCurrency}
            disabled={loading || !fromCurrency || !toCurrency || !amount}
          >
            <FaExchangeAlt className='text-xl' />
            <span>Convert Now</span>
          </Button>
        </div>

        {/* Default Result */}
        {!result && !loading && (
          <div className='flex flex-col items-center gap-2 bg-gray-50 py-15 rounded-xl border border-gray-100 h-55'>
            <img src={emptyResultImg} alt="empty-result" className='w-12' />
            <h2 className='font-semibold text-gray-500 text-xl text-center'>Select currencies to see the conversion result</h2>
            <p className='text-gray-400 text-sm text-center px-14'>Choose a currency pair and enter an amount to view the latest exchange rate.</p>
          </div>
        )}

        {/* Converted Result */}
        {result && !loading && (
          <div className='h-55 flex flex-col justify-center items-start gap-4'>
            <div className='flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4  w-full'>
              <div>
                <p className='text-lg font-semibold text-slate-900'>
                  1 {result.base} = {formatAmount(result.rate)} {result.quote}
                </p>
                <p className='text-sm text-gray-400'>
                  Last updated: {formatUpdated(result.updatedAt)}
                </p>
              </div>
              {result.changePercent !== null && (
                <p className={`font-medium ${result.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {result.changePercent >= 0 ? '↑' : '↓'} {Math.abs(result.changePercent).toFixed(2)}% (24h)
                </p>
              )}
            </div>

            <div className='flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5 w-full'>
              <div>
                <p className='text-xs font-medium tracking-wide text-gray-400'>
                  CONVERTED AMOUNT
                </p>
                <p className='text-3xl font-bold text-slate-900'>
                  {formatAmount(result.converted)} {result.quote}
                </p>
                <p className='text-sm text-gray-400'>
                  {formatAmount(result.amount)} {result.base} = {formatAmount(result.converted)} {result.quote}
                </p>
              </div>
              <button
                type='button'
                className='rounded-xl border border-gray-200 bg-white p-3 text-gray-500 hover:text-primary-color'
                onClick={copyConvertedAmount}
                aria-label={copied ? 'Copied' : 'Copy converted amount'}
              >
                {copied ? <FiCheck className='text-xl text-green-500' /> : <FiCopy className='text-xl' />}
              </button>
            </div>
          </div>
        )}

        {
          loading && (
            <div className='flex flex-col items-center gap-2 bg-gray-50 py-15 rounded-xl border border-gray-100 h-55'>
              <Bouncy
                size="45"
                speed="1.75"
                color='#5F8DF7'
              />
              <p className='text-gray-400 text-sm text-center px-14'>Please wait while we are converting the currency...</p>
              <p className='text-gray-400 text-sm text-center px-14'>This may take a few seconds.</p>
            </div>
          )
        }
      </div>

      {/* Data Chart */}
      <DataChart />
    </section>
  )
}

export default ConverterPage