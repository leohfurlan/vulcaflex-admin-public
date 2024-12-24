import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormContextProvider } from '@/contexts/FormContext'
import { LoaderProvider } from '@/contexts/LoaderContext'
import { LoaderOverlay } from '@/components/LoaderOverlay'
import { DashboardProvider } from '@/contexts/DashboardContext'
import { MapProvider } from '@/contexts/MapContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoaderProvider>
          <FormContextProvider>
            <DashboardProvider>
              <MapProvider>
                <>
                  <style jsx global>{`
                    html {
                      font-family: ${inter.style.fontFamily};
                    }
                  `}</style>
                  <LoaderOverlay />
                  <Component {...pageProps} />
                </>
              </MapProvider>
            </DashboardProvider>
          </FormContextProvider>
        </LoaderProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
