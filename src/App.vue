<template>
  <router-view name="auth" />
  <router-view v-if="configStore.config" name="nav" />
  <router-view v-if="configStore.config" class="default-route min-h-[calc(100vh-4rem)] mt-16 lg:ml-56 p-4" />
  <router-view v-if="configStore.config" name="footer" class="lg:ml-56"/>
  <Spinner v-if="configStore.isPending"/>
</template>

<script setup>
import { useConfigStore } from './stores/configStore';

const configStore = useConfigStore();
configStore.updateConfig()

</script>

<style lang="scss">
#app {
  @apply font-inter;
} 

.success{
  @apply text-green-700 bg-green-200
}
.failure{
  @apply text-red-700 bg-red-200
}

.skeleton{
  opacity: .7;
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 05%);
  }
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
