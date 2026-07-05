import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {RouterProvider} from 'react-router-dom'
import { Router } from './Router'
import './index.css'
import { Toaster } from 'sileo'
const ClientQuery = new QueryClient({
  defaultOptions:{
    queries:{
      retry:1,
      staleTime: 1000 * 60 * 5
    }
  }
})



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster  offset={{top:40}}  theme='dark'   position="top-center"/>
   <QueryClientProvider client={ClientQuery}>
    <RouterProvider router={Router}/>
   </QueryClientProvider>
  </StrictMode>,
)
