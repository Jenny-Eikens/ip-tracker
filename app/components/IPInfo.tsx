import React from 'react'

interface IPInfoProps {
  ipAddress: string | null
  city: string
  region: string
  postalCode: string
  timezone: string
  isp: string
}

const IPInfo = ({
  ipAddress,
  city,
  region,
  postalCode,
  timezone,
  isp,
}: IPInfoProps) => {
  return (
    <>
      <div className="md w-full space-y-3 rounded-xl bg-white p-6 text-center md:flex md:w-auto md:items-start md:justify-start md:space-x-10 md:space-y-0 md:p-10 md:text-left">
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
    </>
  )
}

export default IPInfo
