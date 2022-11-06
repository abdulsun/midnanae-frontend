import React from 'react'
import { AuthProvider } from './Context/AuthContext'
import Navigations from './Navigations'

function App() {
  
  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  )
}

export default App