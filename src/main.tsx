import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

// Suppress analytics-related console errors in client-only setup
const originalConsoleError = console.error
console.error = (...args) => {
  const message = args[0]
  if (typeof message === 'string' && 
      (message.includes('Failed to send analytics events') || 
       message.includes('BlinkNetworkError') ||
       message.includes('/api/analytics/'))) {
    // Suppress analytics errors - these are expected in client-only setup
    return
  }
  originalConsoleError.apply(console, args)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster position="top-right" />
    <App />
  </React.StrictMode>,
) 