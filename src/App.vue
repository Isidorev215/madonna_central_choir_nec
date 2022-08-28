<template>
  <router-view name="nav" />
  <router-view name="auth" />
  <router-view class="default-route mt-16 lg:ml-56" />
</template>

<style lang="scss">
#app {
  @apply font-inter;
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
