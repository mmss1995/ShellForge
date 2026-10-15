import { describe, expect, it, vi } from 'vitest'
import { authStore } from './auth/authStore'
import { eventBus } from './events/eventBus'

describe('authStore', () => {
  it('logs in, notifies, and stops after unsubscribe', () => {
    const l = vi.fn()
    const off = authStore.subscribe(l)
    authStore.login('1', 'admin')
    expect(authStore.getState()).toEqual({ userId: '1', role: 'admin', isAuthenticated: true })
    off()
    authStore.logout()
    expect(l).toHaveBeenCalledTimes(1)
    expect(authStore.getState().isAuthenticated).toBe(false)
  })
  it('a throwing listener does not block the others', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ok = vi.fn()
    const a = authStore.subscribe(() => { throw new Error('x') })
    const b = authStore.subscribe(ok)
    authStore.login('2', 'user')
    expect(ok).toHaveBeenCalled()
    a(); b(); authStore.logout(); err.mockRestore()
  })
})

describe('eventBus', () => {
  it('delivers payloads and unsubscribes', () => {
    const h = vi.fn()
    const off = eventBus.on('user:login', h)
    eventBus.emit('user:login', { userId: '1', role: 'a' })
    off()
    eventBus.emit('user:login', { userId: '2', role: 'b' })
    expect(h).toHaveBeenCalledTimes(1)
    expect(h).toHaveBeenCalledWith({ userId: '1', role: 'a' })
  })
})
