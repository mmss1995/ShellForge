import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const ReactApp = lazy(() => import('mfe_react/App'))
const VueApp   = lazy(() => import('mfe_vue/App'))

function Fallback() {
  return <div style={{ padding: '2rem' }}>Loading...</div>
}

export function AppRouter() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/"        element={<Navigate to="/react" replace />} />
        <Route path="/react/*" element={<ReactApp />} />
        <Route path="/vue/*"   element={<VueApp />} />
        <Route path="*"        element={<div>404 — Page not found</div>} />
      </Routes>
    </Suspense>
  )
}