# Project Context for an Agent

This repository is a **Micro‑Frontend (MFE) Shell** boilerplate that demonstrates how to build a scalable, framework‑agnostic frontend architecture using Webpack 5 Module Federation.  The goal is to allow independent teams to develop, test, and deploy micro‑apps that can coexist in the same browser session without sharing the same bundle.

## High‑level structure

```
mfe-shell/
├── shell/          # Host application (container)
├── mfe-react/      # React 18 micro‑app
├── mfe-vue/        # Vue 3 micro‑app
├── shared/         # Shared contracts, event bus, auth state
└── docker-compose.yml
```

* **shell/** – The host that bootstraps the application, sets up routing, and provides shared dependencies.
* **mfe‑react/** – A React micro‑app that exposes its root component via Module Federation.
* **mfe‑vue/** – A Vue micro‑app that does the same.
* **shared/** – TypeScript interfaces, a typed event bus (`shared/events/eventBus.ts`), and shared authentication state (`shared/auth/`).
* **docker‑compose.yml** – Spin up the entire stack with a single command.

## Key concepts

* **Module Federation** – Each micro‑app is built as a *remote* that the host loads at runtime.  This keeps bundles small and allows independent deployments.
* **Framework agnostic** – The host can load React and Vue side‑by‑side because dependencies are shared as singletons.
* **Typed event bus** – Cross‑app communication is handled through a lightweight event bus that is type‑safe thanks to TypeScript.
* **Shared auth** – Authentication state lives in the host and is exposed to all micro‑apps.

## Typical workflow

1. **Clone** the repo.
2. Run `docker-compose up` to start all services, or start each app manually with `npm install && npm start`.
3. The shell will be available at `http://localhost:3000` and will load the micro‑apps from `http://localhost:3001` and `http://localhost:3002`.
4. Micro‑apps can be updated independently; only the host needs to be redeployed if shared dependencies change.

## Extending the project

* Add a new micro‑app: create a new folder, configure Module Federation, expose components, and register it in the host's `remotes`.
* Add shared types or utilities in `shared/src/`.
* Update the Docker compose file to include new services.

## Resources

* [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
* [React Router](https://reactrouter.com/)
* [Vue Router](https://router.vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)

---

This file is intended to give a new agent (or developer) a quick overview of the project structure, core concepts, and how to get started.