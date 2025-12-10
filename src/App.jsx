import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Page/AptitudeTest'
import About from './Page/PythonTest'
import OrionAptitudeTest from './Page/OrionAptitudeTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pythontest" element={<About />} />
        <Route path="/orion-test" element={<OrionAptitudeTest />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
