export type User = {
    id: string
    name: string
    email: string
    role: 'admin' | 'user' | 'guest'
}

export type AppRoute = {
    path: string
    label: string
    app: 'mfe-react' | 'mfe-vue'
}