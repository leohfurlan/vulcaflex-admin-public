import { useEffect, useState } from 'react'
import { useGetBarrelSpecification } from '@/hooks/useGetBarrelSpecification'
import { useFormContext } from '@/contexts/FormContext'
import { useDashboardContext } from '@/contexts/DashboardContext'

interface UnitySpecifications {
  qnt_placas: number
  qnt_processos: number
  qnt_tambores: number
  qnt_transportadores: number
}

interface DataSource {
  key: keyof UnitySpecifications
  data: number | undefined
}

export function useDashboardData() {
  const { formData } = useFormContext()
  const { unitySpecifications, setUnitySpecifications } = useDashboardContext()

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
    { key: 'qnt_placas', data: dataPlate?.qnt_placas },
    { key: 'qnt_processos', data: dataPlate?.qnt_processos },
    {
      key: 'qnt_transportadores',
      data: dataPlate?.qnt_transportadores,
    },
    { key: 'qnt_tambores', data: dataPlate?.qnt_tambores },
  ]

  useEffect(() => {
    const updates = dataSources.reduce((acc, { key, data }) => {
      if (data !== undefined) {
        acc[key] = data
      } else {
        acc[key] = 1
      }

      return acc
    }, {} as UnitySpecifications)

    setUnitySpecifications((prev) => ({
      ...prev,
      ...updates,
    }))
  }, [dataUnity, dataProcess, dataTransporter, dataBarrel, dataPlate])

  return {
    dataUnity,
    dataProcess,
    dataTransporter,
    dataBarrel,
    dataPlate,
    hasError,
    unitySpecifications,
  }
}
