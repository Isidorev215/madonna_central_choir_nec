<template>
  <router-link to="/profile-page" class="block lg:flex items-center relative cursor-pointer text-black dark:text-white dark:hover:text-slate-400 hover:text-blue-500 py-2 px-3">
    <div class="flex items-center">
      <span class="inline-flex justify-center items-center w-6 h-6 transition-colors">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
      </span>
      <span class="px-2 transition-colors">
        Profile
      </span>
    </div>
  </router-link>
  
  <hr class="hidden lg:block lg:my-0.5 dark:border-slate-700 border-t border-gray-100">

  <button @click="$emit('logout')" class="block lg:flex items-center relative cursor-pointer text-black dark:text-white dark:hover:text-slate-400 hover:text-blue-500 py-2 px-3">
    <div class="flex items-center">
      <span class="inline-flex justify-center items-center w-6 h-6 transition-colors">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"></path></svg>
      </span>
      <span class="px-2 transition-colors">
      Logout
    </span>
    </div>
  </button>
</template>

<script>
export default {
  emits: [ 'logout' ]
}
</script>

<style>

</style>
