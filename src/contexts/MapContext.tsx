import { createContext, useContext } from 'react'
import { Libraries, useJsApiLoader } from '@react-google-maps/api'

interface MapContextProviderProps {
  children: React.ReactNode
}

interface MapContextProps {
  isLoaded: boolean
  loadError: Error | undefined
}

const MapContext = createContext({} as MapContextProps)

const libraries = ['places', 'drawing', 'geometry']

export function MapProvider({ children }: MapContextProviderProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  })

  if (loadError) return <p>Encountered error while loading google maps</p>

  if (!isLoaded) return <p>Map Script is loading ...</p>

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapContext.Provider>
  )
}

export function useMapContext() {
  const ctx = useContext(MapContext)
  if (!ctx) {
    throw new Error('useMapContext must be used within a MapContextProvider')
  }
  return ctx
}
