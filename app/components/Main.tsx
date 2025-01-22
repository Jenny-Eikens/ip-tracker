'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import SearchBar from './SearchBar'
import IPInfo from './IPInfo'

const Main = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [geoData, setGeoData] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        if (!res.ok) {
          alert('Error fetching data')
          return
        }
        const data = await res.json()
        setIpAddress(data.ip)
      } catch (error) {
        console.log('Failed to fetch IP address', error)
      }
    }
    fetchIpAddress()
  }, [])

  useEffect(() => {
    if (!ipAddress) return

    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api?ipAddress=${encodeURIComponent(ipAddress)}`,
        )
        if (!res.ok) throw new Error('Failed to fetch data')
        const data = await res.json()
        setGeoData(data)
      } catch (error) {
        console.error('Failed to fetch geo data', error)
      }
    }
    fetchData()
  }, [ipAddress])

  if (!geoData || !geoData.location) {
    return (
      <>
        <div className="m-auto flex flex-col items-center justify-center space-y-4 text-center text-2xl">
          <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" />
          <div>Loading...</div>
        </div>
      </>
    )
  }

  const { lat, lng, region, city, postalCode, timezone } = geoData.location
  const isp = geoData.isp
  const ip = geoData.ip

  const handleSearch = (address: string) => {
    if (address.trim() === '') {
      alert('Search cannot be empty!')
      return
    }
    setIpAddress(address)
  }

  const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
      <>
        <div className="m-auto flex flex-col items-center justify-center space-y-4 text-center text-2xl">
          <FontAwesomeIcon icon={faSpinner} spinPulse size="2xl" />
          <div>Loading map...</div>
        </div>
      </>
    ),
  })

  return (
    <>
      <Map latitude={lat} longitude={lng} />

      <div className="overlay pointer-events-none absolute inset-0 z-[1000]">
        <div className="pointer-events-auto flex flex-col items-center">
          <div className="wrapper mt-6 flex w-[85vw] max-w-[1100px] flex-col items-center space-y-4 md:mt-8 md:space-y-9">
            <h1 className="text-2xl font-[500] text-white md:text-3xl">
              IP Address Tracker
            </h1>

            <SearchBar handleSearch={handleSearch} />

            <IPInfo
              ipAddress={ip}
              region={region}
              city={city}
              postalCode={postalCode}
              timezone={timezone}
              isp={isp}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
