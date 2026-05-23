# 🧱 MFE Shell — Microfrontend Boilerplate

> Architettura microfrontend production-ready con Module Federation, shell app e micro-app indipendenti in React e Vue.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Webpack](https://img.shields.io/badge/Webpack-5-8DD6F9?logo=webpack)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vue](https://img.shields.io/badge/Vue-3+-42b883?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)

---

## 🎯 Obiettivo del Progetto

I monoliti frontend diventano insostenibili man mano che i team crescono: deploy accoppiati, conflitti di dipendenze, impossibilità di aggiornare un framework senza toccare tutto il resto.

**MFE Shell** è un boilerplate funzionante che dimostra come costruire un'applicazione frontend scalabile come insieme di micro-app indipendenti, ciascuna con il proprio ciclo di deploy, il proprio framework e il proprio team di riferimento — esattamente come avviene nei progetti enterprise di grandi dimensioni.

---

## 🏗️ Architettura

```
mfe-shell/
├── shell/                     # App contenitore (host)
│   ├── src/
│   │   ├── router/            # Routing tra micro-app
│   │   ├── layout/            # Header, sidebar, layout globale
│   │   └── bootstrap.ts
│   └── webpack.config.js      # Module Federation host config
│
├── mfe-react/                 # Micro-app 1 — React 18
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/
│   └── webpack.config.js      # Module Federation remote config
│
├── mfe-vue/                   # Micro-app 2 — Vue 3
│   ├── src/
│   │   ├── App.vue
│   │   └── components/
│   └── webpack.config.js      # Module Federation remote config
│
├── shared/                    # Contratti condivisi tra app
│   ├── types/                 # TypeScript interfaces
│   ├── events/                # Event bus per comunicazione cross-app
│   └── auth/                  # Stato autenticazione condiviso
│
└── docker-compose.yml         # Avvio locale dell'intera architettura
```

---

## ✨ Funzionalità Principali

- **Module Federation (Webpack 5)** — le micro-app si caricano a runtime senza essere bundlate insieme
- **Framework agnostic** — React e Vue convivono nella stessa shell senza conflitti
- **Shared dependencies** — React, Vue e le librerie comuni sono condivise tra host e remoti per evitare duplicazioni
- **Event bus tipizzato** — comunicazione tra micro-app tramite custom events con TypeScript
- **Auth condivisa** — lo stato di autenticazione è gestito dalla shell e reso disponibile a tutte le micro-app
- **Docker Compose** — un singolo comando per avviare l'intera architettura in locale
- **Deploy indipendenti** — ogni micro-app può essere deployata senza toccare le altre

---

## 🚀 Quick Start

```bash
# Clona il repository
git clone https://github.com/matteosausto/mfe-shell.git
cd mfe-shell

# Avvio con Docker (consigliato)
docker-compose up

# oppure avvio manuale
cd mfe-react && npm install && npm start &
cd mfe-vue   && npm install && npm start &
cd shell      && npm install && npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`.

---

## ⚙️ Module Federation — Configurazione

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
    react:     { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom': { singleton: true },
    vue:       { singleton: true, requiredVersion: '^3.0.0' },
  },
})
```

### Micro-app React (Remote)

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

## 📡 Comunicazione tra Micro-app

La comunicazione avviene tramite un event bus leggero — nessun accoppiamento diretto tra le app.

```ts
// shared/events/eventBus.ts
type AppEvents = {
  'user:login':  { userId: string; role: string };
  'cart:update': { itemCount: number };
};

// Emettere un evento dalla micro-app React
eventBus.emit('user:login', { userId: '42', role: 'admin' });

// Ascoltare nella micro-app Vue
eventBus.on('user:login', ({ userId }) => {
  console.log(`Utente loggato: ${userId}`);
});
```

---

## 🧰 Stack Tecnologico

| Strumento | Ruolo |
|---|---|
| **Webpack 5 + Module Federation** | Caricamento runtime delle micro-app |
| **React 18** | Framework micro-app 1 |
| **Vue 3** | Framework micro-app 2 |
| **TypeScript** | Contratti condivisi e type safety |
| **Docker + docker-compose** | Orchestrazione locale |
| **React Router / Vue Router** | Routing interno alle micro-app |

---

## 📄 Licenza

MIT © [Matteo Sausto](https://github.com/matteosausto)
