import { useState, useEffect } from 'react'

type QueryFn<T> = () => Promise<T>

interface QueryOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface QueryState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useQuery<T>(
  queryFn: QueryFn<T>,
  options: QueryOptions<T> = {}
): QueryState<T> {
  const { onSuccess, onError } = options
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    queryFn()
      .then((response) => {
        setData(response)
        setIsLoading(false)
        if (onSuccess) onSuccess(response)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
        if (onError) onError(error)
      })
  }, [queryFn, onSuccess, onError])

  return { data, isLoading, error }
}
