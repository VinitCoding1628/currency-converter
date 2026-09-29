import React, { useEffect, useState } from 'react'
import titleLogoImg from '../assets/images/title_logo.svg'
import axios from 'axios'
import { Autocomplete, Button, TextField } from '@mui/material'
import { BsDash } from 'react-icons/bs'
import { FaExchangeAlt } from 'react-icons/fa'
import emptyResultImg from '../assets/images/bar_chart_icon.svg'


const Converter = () => {
    const [getCurrencies, setGetCurrencies] = useState([])
    const [fromCurrency, setFromCurrency] = useState(null)
    const [toCurrency, setToCurrency] = useState(null)
    const [amount, setAmount] = useState('');

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

    useEffect(() => {
        fetchCurrencies()
    }, [])

    // Convert Currency Function
    const convertCurrency = () => {
        console.log('From Currency:', fromCurrency);
        console.log('To Currency:', toCurrency);
        console.log('Amount:', amount);
    }

    return (
        <div className='bg-white w-1/2 rounded-xl p-5 shadow-md flex flex-col justify-center gap-4'>
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
                    className='w-full lg:text-base flex items-center gap-4 bg-linear-to-r shadow-md! shadow-primary-color/50! from-primary-color to-secondary-color py-3! font-semibold rounded-xl! hover:scale-100 hover:shadow-lg transition-all duration-300 ease-in-out! mt-4 text-base!' sx={{ textTransform: 'capitalize' }}
                    onClick={convertCurrency}
                >
                    <FaExchangeAlt className='text-xl' />
                    <span>Convert Now</span>
                </Button>
            </div>

            {/* Result */}
            {(!fromCurrency || !toCurrency || !amount) && (
                <div className='flex flex-col items-center gap-4 bg-gray-50 py-10 rounded-xl border border-gray-100'>
                    <img src={emptyResultImg} alt="empty-result" className='w-12' />
                    <div>
                        <h2 className='font-semibold text-2xl text-center'>Select currencies to see the conversion result</h2>
                        <p className='text-gray-400 text-center'>Choose a currency pair and enter an amount to view the latest exchange rate.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Converter