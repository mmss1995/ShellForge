type AuthState = {
  userId: string | null
  role: string | null
  isAuthenticated: boolean
}

type Listener = (state: AuthState) => void

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
    this.listeners.forEach((l) => l(this.state))
  }
}

export const authStore = new AuthStore()