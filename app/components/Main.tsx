'use client'

import React, { useState, useEffect } from 'react'
import Map from './Map'
import SearchBar from './SearchBar'
import { GET } from '../api/route'

const Main = () => {
  const [ipAddress, setIpAddress] = useState<string | null>('')
  const [geoData, setGeoData] = useState<any>(null)

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        setIpAddress(data.ip)
        // console.log('IP Address:', ipAddress)
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
        console.log('Data: ', data)
        setGeoData(data)
      } catch (error) {
        console.error('Failed to fetch geo data', error)
      }
    }
    fetchData()
  }, [ipAddress])

  if (!geoData || !geoData.location) {
    return <div className="text-4xl font-bold">Loading...</div>
  }

  const { lat, lng, region, city, postalCode, timezone, isp } = geoData.location

  const handleSearch = (address: string) => {
    if (address.trim() === '') {
      alert('Search cannot be empty!')
      return
    }
    setIpAddress(address)
  }

  return (
    <>
      <Map latitude={lat} longitude={lng} />

      <div className="overlay fixed inset-0 z-[1000] flex flex-col items-center">
        <SearchBar
          ipAddress={ipAddress}
          region={region}
          city={city}
          postalCode={postalCode}
          timezone={timezone}
          isp={isp}
          handleSearch={(address: string) => handleSearch(address)}
        />
      </div>
    </>
  )
}

export default Main
