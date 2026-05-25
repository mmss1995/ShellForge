import { useEffect, useRef } from 'react'

type Props = {
  factory: () => Promise<{ default: object }>
}

export function VueMounter({ factory }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let app: { unmount: () => void } | null = null

    factory().then(async (module) => {
      const { createApp } = await import('vue')
      app = createApp(module.default as object)
      if (containerRef.current) {
        app.mount(containerRef.current)
      }
    })

    return () => {
      app?.unmount()
    }
  }, [factory])

  return <div ref={containerRef} />
}