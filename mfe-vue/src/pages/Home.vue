<template>
  <div>
    <h1>Vue Micro-app</h1>
    <p>This app is served by mfe-vue on port 3002.</p>
    <button @click="emitLogin">Emit login event</button>
  </div>
</template>

<script setup lang="ts">
import { eventBus } from '@mfe/shared'

function emitLogin() {
  eventBus.emit('user:login', { userId: '2', role: 'user' })
}
</script>