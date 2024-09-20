import { useLoader } from '@/contexts/LoaderContext'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

type UseLoaderQueryOptions<T> = {
  queryKey: any[]
  queryFn: () => Promise<T>
  enabled?: boolean
  staleTime?: number
}

export function useLoaderQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 0,
}: UseLoaderQueryOptions<T>) {
  const { showLoader, hideLoader } = useLoader()

  const queryResult = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
  })

  useEffect(() => {
    if (queryResult.isLoading) {
      showLoader()
    } else {
      hideLoader()
    }
  }, [queryResult.isLoading, showLoader, hideLoader])

  return queryResult
}
