import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { Query } from "./pages/query-page"
import { Result } from "./pages/result-page"

function App() {
  const [address, setAddress] = useState("")

  return (
    <div>
      <Routes>
        <Route index element={<Query setAddress={setAddress}/>} />
        <Route path="result" element={<Result address={address}/>} />
        <Route path="*" element={<Navigate to="/" replace />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
