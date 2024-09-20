import { getBarrelSpecification } from '@/services/getBarrelSpecification'
import { useLoaderQuery } from './useLoaderQuery'

export function useGetBarrelSpecification(
  enabled: boolean,
  unity?: string,
  process?: string,
  transporter?: string,
) {
  return useLoaderQuery({
    queryKey: ['useGetBarrelSpecification', unity, process, transporter],
    enabled,
    queryFn: () => getBarrelSpecification(unity, process, transporter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
