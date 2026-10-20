# 🧱 ShellForge — Microfrontend Boilerplate

> Production-ready microfrontend architecture with Module Federation, a shell app, and independent micro-apps in React and Vue.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vue](https://img.shields.io/badge/Vue-3+-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)

---

## 🎯 Purpose

Frontend monoliths become unsustainable as teams grow: coupled deployments, dependency conflicts, and the inability to upgrade a framework without touching everything else.

**ShellForge** is a working boilerplate that demonstrates how to build a scalable frontend as a set of independent micro-apps — each with its own deploy cycle, its own framework and its own team ownership — exactly as it happens in large-scale enterprise projects.

---

## 🏗️ Architecture

```
shellforge/
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

- **Module Federation (Vite)** — micro-apps load at runtime without being bundled together
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
git clone https://github.com/mmss1995/shellforge.git
cd shellforge

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

Vite + `@originjs/vite-plugin-federation`. See `shell/vite.config.ts` (host) and `mfe-*/vite.config.ts` (remotes).
Remote URLs can be overridden with `REMOTE_REACT_URL` and `REMOTE_VUE_URL`.

---

## 📡 Cross-app Communication

Communication happens through a lightweight event bus — no direct coupling between apps.

```ts
// shared/events/eventBus.ts
type AppEvents = {
  'user:login':  { userId: string; role: string };
  'app:navigate': { path: string };
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
| **Vite + Module Federation** | Runtime loading of micro-apps |
| **React 19** | Micro-app 1 framework |
| **Vue 3** | Micro-app 2 framework |
| **TypeScript** | Shared contracts and type safety |
| **React Router** | Routing in the shell and the React micro-app |

---

## 👤 Author

**Matteo Sausto** — [github.com/mmss1995](https://github.com/mmss1995)

---

## 📄 License

MIT © [Matteo Sausto](https://github.com/mmss1995)
