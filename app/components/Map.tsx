'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  latitude: number
  longitude: number
}

const Map = ({ latitude, longitude }: MapProps) => {
  const customMarker = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [46, 56], // Size of the SVG
    iconAnchor: [20, 40], // Position relative to the point
    popupAnchor: [0, -40], // Position of the popup relative to the marker
  })

  const CustomZoomControl = () => {
    const map = useMap()

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    return null
  }

  return (
    <>
      <div className="h-[60vh] w-full md:h-[80vh] xl:h-[70vh]">
        <MapContainer
          center={[latitude, longitude] as [number, number]}
          zoom={15}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={[latitude, longitude]} icon={customMarker} />
          <CustomZoomControl />
        </MapContainer>
      </div>
    </>
  )
}

export default Map
