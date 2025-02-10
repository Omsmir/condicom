import React from 'react'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryProvider = ({children}:{children: React.ReactNode}) => {
    const queryInstance = usesta
  return (
    <QueryClientProvider client={queryInstance}>
        </QueryClientProvider>
  )
}

export default QueryProvider
