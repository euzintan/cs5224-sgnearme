import { useState } from 'react'
import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

import { Query } from "./pages/query-page"
import { Result } from "./pages/result-page"

function App() {

  return (
    <div>
      <Routes>
        <Route index element={<Query />} />
        <Route path="result" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
