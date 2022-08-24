<template>
  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
    <li class="w-full">
      <!-- <router-link to="/profile" class="hover:bg-gray-300 w-full block text-left p-2">Profile</router-link> -->
    </li>
  </ul>
  <div class="py-1">
    <button @click="$emit('logout')" href="#" class="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</button>
  </div>
</template>

<script>
export default {
  emits: [ 'logout' ]
}
</script>

<style>

</style>
