import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './routes/LandingPage/index.jsx'
import PollScreen from './routes/PollScreen'
import { AuthProvider } from './context/Auth'
import AddPole from './routes/AddPole'
import AddName from './routes/AddName'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/poll",
    element: <PollScreen />
  },
  {
    path: "/addPoll",
    element: <AddPole />
  },
  {
    path: "/addName",
    element: <AddName />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
