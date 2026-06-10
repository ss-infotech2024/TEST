import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Page/AptitudeTest'
import About from './Page/PythonTest'
import OrionAptitudeTest from './Page/OrionAptitudeTest'
import GermanTest from './Page/GermanTest'
import DataEngineeringTest from './Page/DataEngineeringTest'
import Pixelstate from './Page/Pixelstate'
import AlineInfotech from './Page/Segelboot'
import Segelboot from './Page/Segelboot'
import Cyberspheres from './Page/Cybersphere'
import Pgelecto from './Page/Pgelecto'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pythontest" element={<About />} />
        <Route path="/orion-test" element={<OrionAptitudeTest />} />
        <Route path="/german-test" element={<GermanTest />} />
        <Route path="/db-test" element={<DataEngineeringTest />} />
        <Route path="/pixelstat" element={<Pixelstate />} />
        <Route path="/segelboot" element={<Segelboot />} />
        <Route path="/cyberspheres" element={<Cyberspheres />} />
        <Route path="/pg" element={<Pgelecto />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
