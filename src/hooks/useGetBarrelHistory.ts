import { IFormValues } from '@/components/StatusForm'
import { useLoaderQuery } from './useLoaderQuery'
import { getBarrelHistory } from '@/services/getBarrelHistory'

export function useGetBarrelHistory(
  formState: IFormValues,
  startDate: string,
  endDate: string,
  enabled: boolean,
) {
  const { unity, process, transporter, barrel } = formState
  const params = new URLSearchParams()

  params.append('unidadeCliente', unity!)
  params.append('processoUnidade', process!)
  params.append('transportadorCorreia', transporter!)
  params.append('tamborId', barrel!)
  params.append('dataInicio', `${startDate} 00:00:00`)
  params.append('dataFim', `${endDate} 23:59:00`)

  return useLoaderQuery({
    queryKey: [
      'useGetBarrelHistory',
      unity,
      process,
      transporter,
      barrel,
      startDate,
      endDate,
    ],
    queryFn: () => getBarrelHistory(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
