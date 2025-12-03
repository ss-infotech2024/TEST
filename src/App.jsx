import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Page/AptitudeTest'
import About from './Page/PythonTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pythontest" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
