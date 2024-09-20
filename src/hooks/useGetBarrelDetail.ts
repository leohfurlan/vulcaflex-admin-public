import { getBarrelDetail } from '@/services/getBarrelDetail'
import { IFormValues } from '@/components/StatusForm'
import { useLoaderQuery } from './useLoaderQuery'

export function useGetBarrelDetail(formState: IFormValues, enabled: boolean) {
  const { unity, process, transporter, barrel } = formState
  const params = new URLSearchParams()

  params.append('unidadeCliente', unity!)
  params.append('processoUnidade', process!)
  params.append('transportadorCorreia', transporter!)
  params.append('tamborId', barrel!)

  return useLoaderQuery({
    queryKey: ['useGetBarrelDetail', unity, process, transporter, barrel],
    queryFn: () => getBarrelDetail(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
