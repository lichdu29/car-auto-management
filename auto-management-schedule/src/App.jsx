// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Routes from './router'

function App() {
  const element = useRoutes(Routes)
  return (
    <>
      {element}
    </>
  )
}

export default App
