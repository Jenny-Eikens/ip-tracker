'use client'

import React, { useState } from 'react'

const iconArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
    <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim() === '') {
        alert('Search cannot be empty!')
        return
      }
      handleSearch(input)
    }
  }

  return (
    <>
      <div className="wrapper mt-6 flex w-[85vw] max-w-[1100px] flex-col items-center space-y-4 md:mt-8 md:space-y-8">
        <h1 className="text-2xl font-[500] text-white md:text-3xl">
          IP Address Tracker
        </h1>

        <div className="flex w-full overflow-hidden rounded-xl md:w-[40%]">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="w-full px-4 placeholder:text-sm hover:cursor-pointer focus:cursor-text focus:outline-none md:placeholder:text-base"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="flex h-full items-center bg-v-dark-gray p-5"
            onClick={onSearch}
          >
            {iconArrow}
          </button>
        </div>

        <div className="space-y-4 rounded-xl bg-white p-6 text-center md:flex md:items-start md:justify-start md:space-x-8 md:space-y-0 md:py-8 md:text-left">
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
            <p className="result">{isp ? isp : 'unknown'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
