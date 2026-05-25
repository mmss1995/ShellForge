import { eventBus } from '@mfe/shared'

export function Home() {

  const handleLogin = () => {
    console.log('Button Clicked');
    
    eventBus.emit('user:login', { userId: '1', role: 'admin' })
  }

  return (
    <div>
      <h1>React Micro-app</h1>
      <p>This app is served by mfe-react on port 3001.</p>
      <button onClick={handleLogin}>Emit login event</button>
    </div>
  )
}