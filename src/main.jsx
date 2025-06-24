import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Route.jsx'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AuthProvider from './Providers/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// ..
AOS.init();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className='font-urbanist'>
          <RouterProvider router={router} />
          <ToastContainer/>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
