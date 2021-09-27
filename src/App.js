import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/auth';
import Routes from './routes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3000} position="bottom-right" />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
