import React from 'react'
import ReactDOM from 'react-dom/client'
import DataProvider from './DataProvider'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
