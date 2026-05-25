import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { VueMounter } from '../components/VueMounter/VueMounter'

const ReactApp = lazy(() => import('mfe_react/App'))

function Fallback() {
  return <div style={{ padding: '2rem' }}>Loading...</div>
}

export function AppRouter() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/"        element={<Navigate to="/react" replace />} />
        <Route path="/react/*" element={<ReactApp />} />
        <Route path="/vue/*"   element={
          <VueMounter factory={() => import('mfe_vue/App')} />
        } />
        <Route path="*"        element={<div>404 — Page not found</div>} />
      </Routes>
    </Suspense>
  )
}