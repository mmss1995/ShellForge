import { Component, type ReactNode } from 'react'

type Props = { name: string; children: ReactNode }

// Error boundaries must be classes: React has no hook for them.
export class RemoteBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(`${this.props.name} failed to load`, error)
  }

  render() {
    return this.state.failed ? <div>{this.props.name} unavailable.</div> : this.props.children
  }
}
