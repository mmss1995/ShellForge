type AppEvents = {
    'user:login': { userId: string; role: string }
    'user:logout': undefined
    'app:navigate': { path: string }
}

type EventHandler<T> = T extends undefined ? () => void : (payload: T) => void

class EventBus {
    private listeners: Map<string, Set<Function>> = new Map()

    on<K extends keyof AppEvents>(event: K, handler: EventHandler<AppEvents[K]>): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event)!.add(handler)
        return () => this.off(event, handler)
    }

    off<K extends keyof AppEvents>(event: K, handler: EventHandler<AppEvents[K]>): void {
        this.listeners.get(event)?.delete(handler)
    }

    emit<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void {
        this.listeners.get(event)?.forEach((handler) => handler(payload))
    }
}

export const eventBus = new EventBus()