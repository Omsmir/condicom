import React from 'react'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryInstance}>
  )
}

export default QueryProvider
