'use client'

import React, { useState } from 'react'

const iconArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
    <path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" />
  </svg>
)

interface SearchBarProps {
  ipAddress: string | null
  city: string
  region: string
  postalCode: string
  timezone: string
  isp: string
  handleSearch: (address: string) => void
}

const SearchBar = ({
  ipAddress,
  city,
  region,
  postalCode,
  timezone,
  isp,
  handleSearch,
}: SearchBarProps) => {
  const [input, setInput] = useState<string>('')

  const onSearch = () => {
    handleSearch(input)
  }

  return (
    <>
      <div className="wrapper mt-6 flex w-[90vw] max-w-[950px] flex-col items-center space-y-6 md:mt-8">
        <h1 className="text-2xl font-[500] text-white md:text-3xl">
          IP Address Tracker
        </h1>

        <div className="flex w-full overflow-hidden rounded-xl md:w-[60%]">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="w-full px-4 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-v-dark-gray flex h-full items-center p-5"
            onClick={onSearch}
          >
            {iconArrow}
          </button>
        </div>

        <div className="space-y-4 rounded-xl border-2 border-red-400 bg-white p-6 text-center md:flex md:items-center md:justify-center md:space-x-4 md:py-8 md:text-left">
          <div className="result-wrapper">
            <h1 className="result-header">IP ADDRESS</h1>
            <p className="result">{ipAddress}</p>
          </div>

          <div className="result-wrapper">
            <h1 className="result-header">LOCATION</h1>
            <p className="result">
              {city}, {region}
              {postalCode && <span> {postalCode}</span>}
            </p>
          </div>

          <div className="result-wrapper">
            <h1 className="result-header">TIMEZONE</h1>
            <p className="result">UTC {timezone}</p>
          </div>

          <div className="result-wrapper">
            <h1 className="result-header">ISP</h1>
            <p className="result">{isp}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
