<template>
  <div class="content py-7 bg-mcc-blue h-full flex flex-col flex-wrap space-y-6">
    <div class="top flex justify-center items-center">
      <img src="@/assets/img/logo.png" class="p-2 h-20 w-20 rounded-full bg-mcc-light-gray" alt="WMM Logo" />
    </div>
    <div class="links-up text-white">
      <div class="one-link-wrap">
        <router-link to="/" class="one-link flex items-center justify-start space-x-2 my-3">
          <div class="link-inner py-2 w-full flex justify-start items-center space-x-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path>
            </svg>
            <span>Dashboard</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>