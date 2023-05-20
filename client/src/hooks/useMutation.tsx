import { useState } from 'react'

type MutationStatus = 'idle' | 'loading' | 'success' | 'error'

type MutationOptions<TData> = {
  onSuccess?: (data: TData) => void
  onError?: (error: Error) => void
}

type MutationResult = {
  status: MutationStatus
  error: Error | null
  mutate: (variables?: any) => Promise<void>
}

type MutationFunction<TData> = (variables?: any) => Promise<TData>

function useMutation<TData>(
  mutationFn: MutationFunction<TData>,
  options?: MutationOptions<TData>
): MutationResult {
  const [status, setStatus] = useState<MutationStatus>('idle')
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (variables?: any) => {
    try {
      setStatus('loading')
      setError(null)

      const data = await mutationFn(variables)

      setStatus('success')
      options?.onSuccess?.(data)
    } catch (error: unknown) {
      setStatus('error')
      setError(error as Error)
      options?.onError?.(error as Error)
    }
  }

  return {
    status,
    error,
    mutate,
  }
}

export default useMutation
