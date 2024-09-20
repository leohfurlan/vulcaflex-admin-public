import { useQuery } from '@tanstack/react-query'
import { getBarrelSpecification } from '@/services/getBarrelSpecification'

export function useGetBarrelSpecification(
  enabled: boolean,
  unity?: string,
  process?: string,
  transporter?: string,
) {
  return useQuery({
    queryKey: ['useGetBarrelSpecification', unity, process, transporter],
    enabled,
    queryFn: () => getBarrelSpecification(unity, process, transporter),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
