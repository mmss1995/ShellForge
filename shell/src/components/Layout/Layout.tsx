import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { eventBus, authStore } from '@mfe/shared'

type Props = { children: React.ReactNode }

export function Layout({ children }: Props) {
  const [authState, setAuthState] = useState(authStore.getState())

  useEffect(() => {
    const unsubscribeAuth = authStore.subscribe((state) => {
      setAuthState(state)
    })

    const unsubscribeLogin = eventBus.on('user:login', ({ userId, role }) => {
      authStore.login(userId, role)
    })

    const unsubscribeLogout = eventBus.on('user:logout', () => {
      authStore.logout()
    })

    return () => {
      unsubscribeAuth()
      unsubscribeLogin()
      unsubscribeLogout()
    }
  }, [])

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
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {authState.isAuthenticated ? (
            <>
              <span style={{ color: '#86efac', fontSize: '0.9rem' }}>
                ✓ {authState.userId} ({authState.role})
              </span>
              <button
                onClick={() => eventBus.emit('user:logout', undefined)}
                style={{
                  background: 'transparent',
                  border: '1px solid #cbd5e1',
                  color: '#cbd5e1',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Not logged in</span>
          )}
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  )
}