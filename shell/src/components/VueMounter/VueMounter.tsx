import { useEffect, useRef, useState } from 'react'
import type { App } from 'vue'

type Props = {
  factory: () => Promise<{ default: object }>
}

export function VueMounter({ factory }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let app: App | null = null
    let cancelled = false

    factory()
      .then(async (module) => {
        const { createApp } = await import('vue')
        if (cancelled || !containerRef.current) return
        app = createApp(module.default as object)
        app.mount(containerRef.current)
      })
      .catch((e) => {
        console.error('Vue app failed to load', e)
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
      app?.unmount()
    }
  }, [factory])

  if (failed) return <div>Vue app unavailable.</div>
  return <div ref={containerRef} />
}
