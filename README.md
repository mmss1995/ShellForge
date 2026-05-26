# 🧱 MFE Shell — Microfrontend Boilerplate

> Production-ready microfrontend architecture with Module Federation, a shell app, and independent micro-apps in React and Vue.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vue](https://img.shields.io/badge/Vue-3+-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)

---

## 🎯 Purpose

Frontend monoliths become unsustainable as teams grow: coupled deployments, dependency conflicts, and the inability to upgrade a framework without touching everything else.

**MFE Shell** is a working boilerplate that demonstrates how to build a scalable frontend as a set of independent micro-apps — each with its own deploy cycle, its own framework and its own team ownership — exactly as it happens in large-scale enterprise projects.

---

## 🏗️ Architecture

```
mfe-shell/
├── shell/                     # Container app — Vite + React (port 3000)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/        # Navbar with auth state
│   │   │   └── VueMounter/    # React wrapper for Vue micro-app
│   │   ├── router/            # AppRouter — lazy loads micro-apps
│   │   └── main.tsx
│   └── vite.config.ts         # Module Federation host config
│
├── mfe-react/                 # Micro-app 1 — Vite + React (port 3001)
│   ├── src/
│   │   ├── pages/Home.tsx
│   │   └── App.tsx
│   └── vite.config.ts         # Module Federation remote config
│
├── mfe-vue/                   # Micro-app 2 — Vite + Vue 3 (port 3002)
│   ├── src/
│   │   ├── pages/Home.vue
│   │   └── App.vue
│   └── vite.config.ts         # Module Federation remote config
│
├── shared/                    # Shared package
│   └── src/
│       ├── events/eventBus.ts # Typed event bus
│       └── auth/authStore.ts  # Shared auth state
│
└── package.json               # Yarn workspaces root
```

---

## ✨ Key Features

- **Module Federation (Webpack 5)** — micro-apps load at runtime without being bundled together
- **Framework agnostic** — React and Vue coexist in the same shell without conflicts
- **Shared dependencies** — React, Vue and common libraries are shared between host and remotes to avoid duplication
- **Typed event bus** — cross-app communication via custom events with TypeScript
- **Shared auth** — authentication state is managed by the shell and made available to all micro-apps
- **Docker Compose** — a single command to spin up the entire architecture locally
- **Independent deployments** — each micro-app can be deployed without touching the others

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mmss1995/mfe-shell.git
cd mfe-shell

# Install dependencies
yarn install

# Build remotes (required before dev)
yarn build:remotes

# Start all apps
yarn dev
```

The application will be available at `http://localhost:3000`.

---

## ⚙️ Module Federation Config

### Shell (Host)

```js
// shell/webpack.config.js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    mfe_react: 'mfe_react@http://localhost:3001/remoteEntry.js',
    mfe_vue:   'mfe_vue@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react:       { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true },
    vue:         { singleton: true, requiredVersion: '^3.0.0' },
  },
})
```

### React Micro-app (Remote)

```js
// mfe-react/webpack.config.js
new ModuleFederationPlugin({
  name: 'mfe_react',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

---

## 📡 Cross-app Communication

Communication happens through a lightweight event bus — no direct coupling between apps.

```ts
// shared/events/eventBus.ts
type AppEvents = {
  'user:login':  { userId: string; role: string };
  'cart:update': { itemCount: number };
};

// Emit from the React micro-app
eventBus.emit('user:login', { userId: '42', role: 'admin' });

// Listen from the Vue micro-app
eventBus.on('user:login', ({ userId }) => {
  console.log(`User logged in: ${userId}`);
});
```

---

## 🧰 Tech Stack

| Tool | Role |
|---|---|
| **Webpack 5 + Module Federation** | Runtime loading of micro-apps |
| **React 18** | Micro-app 1 framework |
| **Vue 3** | Micro-app 2 framework |
| **TypeScript** | Shared contracts and type safety |
| **Docker + docker-compose** | Local orchestration |
| **React Router / Vue Router** | Internal routing per micro-app |

---

## 👤 Author

**Matteo Sausto** — [github.com/mmss1995](https://github.com/mmss1995)

---

## 📄 License

MIT © [Matteo Sausto](https://github.com/mmss1995)
