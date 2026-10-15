type AuthState = {
  userId: string | null
  role: string | null
  isAuthenticated: boolean
}

type Listener = (state: AuthState) => void

// UI state only: any app can emit 'user:login', so never use this to authorize anything. Roles must come from a server-verified token.
class AuthStore {
  private state: AuthState = {
    userId: null,
    role: null,
    isAuthenticated: false,
  }
  private listeners: Set<Listener> = new Set()

  getState(): AuthState {
    return this.state
  }

  login(userId: string, role: string): void {
    this.state = { userId, role, isAuthenticated: true }
    this.notify()
  }

  logout(): void {
    this.state = { userId: null, role: null, isAuthenticated: false }
    this.notify()
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify(): void {
    this.listeners.forEach((l) => {
      try { l(this.state) } catch (e) { console.error(e) }
    })
  }
}

export const authStore = new AuthStore()