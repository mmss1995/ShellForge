import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = { children: React.ReactNode }

export function Layout({ children }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        background: '#1e293b',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>
          MFE Shell
        </span>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <NavLink
            to="/react"
            style={({ isActive }) => ({
              color: isActive ? '#60a5fa' : '#cbd5e1',
              textDecoration: 'none'
            })}
          >
            React App
          </NavLink>
          <NavLink
            to="/vue"
            style={({ isActive }) => ({
              color: isActive ? '#60a5fa' : '#cbd5e1',
              textDecoration: 'none'
            })}
          >
            Vue App
          </NavLink>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}