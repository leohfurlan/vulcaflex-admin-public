import { useEffect, useState } from 'react'
import { useMapContext } from '@/contexts/MapContext'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useDashboardContext } from '@/contexts/DashboardContext'

export const defaultMapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '6px',
}

const defaultMapOptions = {
  zoomControl: true,
  disableDefaultUI: true,
}
const defaultMapZoom = 18

export function MapComponent() {
  const { isLoaded } = useMapContext()
  const { dashboard } = useDashboardContext()
  const [enabled, setEnabled] = useState(false)

  const { location } = dashboard

  useEffect(() => {
    if (isLoaded) {
      setEnabled(true)
    }
  }, [isLoaded])

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        options={defaultMapOptions}
        zoom={defaultMapZoom}
        center={location}
      >
        {enabled ? <Marker position={location} /> : null}
      </GoogleMap>
    </div>
  )
}
