'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import SearchBar from './SearchBar'
import { GET } from '../api/route'

const Main = () => {
  const [ipAddress, setIpAddress] = useState<string | null>('')
  const [geoData, setGeoData] = useState<any>(null)

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
        const data = await GET(ipAddress)
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

      <div className="overlay pointer-events-none fixed inset-0 z-[1000]">
        <div className="pointer-events-auto flex flex-col items-center">
          <SearchBar
            ipAddress={ip}
            region={region}
            city={city}
            postalCode={postalCode}
            timezone={timezone}
            isp={isp}
            handleSearch={(address: string) => handleSearch(address)}
          />
        </div>
      </div>
    </>
  )
}

export default Main
