import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Page/AptitudeTest'
import About from './Page/PythonTest'
import OrionAptitudeTest from './Page/OrionAptitudeTest'
import GermanTest from './Page/GermanTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pythontest" element={<About />} />
        <Route path="/orion-test" element={<OrionAptitudeTest />} />
        <Route path="/german-test" element={<GermanTest />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
