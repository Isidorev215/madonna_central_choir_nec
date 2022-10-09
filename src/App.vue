<template>
  <router-view name="nav" />
  <router-view name="auth" />
  <router-view class="default-route min-h-[calc(100vh-4rem)] mt-16 lg:ml-56 p-4" />
  <router-view name="footer" class="lg:ml-56"/>
  <Spinner v-if="configPending"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import useToastForApi from '@/composables/useToastForApi'

const store = useStore();
const configPending = ref(false);

onMounted(() => {
  configPending.value = true;
  axios.get('/config')
  .then(res => {
    configPending.value = false;
    store.commit('updateConfig', res.data.data)
  })
  .catch(err => {
    configPending.value = false;
    store.commit('updateConfig', null);
    useToastForApi(err, 'error');
  })
})
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
