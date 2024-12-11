import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useFormContext } from './FormContext'
import { useGetBarrelSpecification } from '@/hooks/useGetBarrelSpecification'
import { IBarrelSpecificationResponse } from '@/models/BarrelSpecification'

interface DashboardContextProviderProps {
  children: React.ReactNode
}

interface Dashboard {
  qtPlate: number
  qtProcess: number
  qtBarrel: number
  qtTransporter: number
  currThickness: Map<number, number>
}

interface DataSource {
  key: keyof Omit<Dashboard, 'currThickness'>
  data: number | undefined
}

interface DashboardContextProps {
  dashboard: Dashboard
  setDashboard: Dispatch<SetStateAction<Dashboard>>
  dataUnity: IBarrelSpecificationResponse | undefined
  dataProcess: IBarrelSpecificationResponse | undefined
  dataTransporter: IBarrelSpecificationResponse | undefined
  dataBarrel: IBarrelSpecificationResponse | undefined
  dataPlate: IBarrelSpecificationResponse | undefined
  hasError: boolean
}

const DashboardContext = createContext({} as DashboardContextProps)

export function DashboardProvider({ children }: DashboardContextProviderProps) {
  const [dashboard, setDashboard] = useState<Dashboard>({
    qtPlate: 0,
    qtProcess: 0,
    qtBarrel: 0,
    qtTransporter: 0,
    currThickness: new Map<number, number>(),
  })

  const { formData } = useFormContext()

  const { data: dataUnity, isError: isErrorUnity } =
    useGetBarrelSpecification(true)
  const { data: dataProcess, isError: isErrorProcess } =
    useGetBarrelSpecification(!!formData.unity, formData.unity)
  const { data: dataTransporter, isError: isErrorTransporter } =
    useGetBarrelSpecification(
      !!formData.process,
      formData.unity,
      formData.process,
    )
  const { data: dataBarrel, isError: isErrorBarrel } =
    useGetBarrelSpecification(
      !!formData.transporter,
      formData.unity,
      formData.process,
      formData.transporter,
    )
  const { data: dataPlate, isError: isErrorPlate } = useGetBarrelSpecification(
    !!formData.barrel,
    formData.unity,
    formData.process,
    formData.transporter,
    formData.barrel,
  )

  const hasError =
    isErrorUnity ||
    isErrorProcess ||
    isErrorTransporter ||
    isErrorBarrel ||
    isErrorPlate

  const dataSources: DataSource[] = [
    { key: 'qtPlate', data: dataPlate?.qnt_placas },
    { key: 'qtProcess', data: dataPlate?.qnt_processos },
    {
      key: 'qtTransporter',
      data: dataPlate?.qnt_transportadores,
    },
    { key: 'qtBarrel', data: dataPlate?.qnt_tambores },
  ]

  useEffect(() => {
    const map = new Map<number, number>()
    const updates = dataSources.reduce((acc, { key, data }) => {
      if (data !== undefined) {
        acc[key] = data
      } else {
        acc[key] = 1
      }

      return acc
    }, {} as Dashboard)

    dataPlate?.espessuraAtual.forEach((item) => {
      const sectionValues = Object.values(item.secoes)

      sectionValues.forEach((value) => {
        map.set(value, (map.get(value) || 0) + 1)
      })
    })

    setDashboard((prev) => ({
      ...prev,
      ...updates,
      currThickness: map,
    }))
  }, [dataUnity, dataProcess, dataTransporter, dataBarrel, dataPlate])

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        setDashboard,
        dataUnity,
        dataProcess,
        dataTransporter,
        dataBarrel,
        dataPlate,
        hasError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext)
  if (!ctx) {
    throw new Error(
      'useDashboardContext must be used within a DashboardContextProvider',
    )
  }
  return ctx
}
