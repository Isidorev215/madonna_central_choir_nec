<template>
  <div v-if="notifications.length > 0" class="py-2 max-h-[500px] overflow-y-auto overflow-x-hidden">
    <button class="flex items-center space-x-3 py-2 px-2 border-b last:border-0 hover:bg-gray-100" v-for="notif in notifications" :key="notif.id">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
      </svg>
      <p v-if="notif.type === 'CALL'" class="text-gray-600 text-sm text-left">
        <span>{{notif.subject}}</span>.
        <a class="text-blue-500" :href="`tel:${notif.action}`">{{notif.message}}</a>.
        <span>{{notif.formatted_created_at}}</span>
      </p>
      <p v-else class="text-gray-600 text-sm text-left">
        <span>{{notif.subject}}</span>.
        <span>{{notif.message}}</span>.
        <span>{{notif.formatted_created_at}}</span>
      </p>
    </button>
  </div>
  <div v-else class="py-2 max-h-[500px] overflow-y-auto overflow-x-hidden">
    <div class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
      <p class="text-gray-600 text-sm mx-2">No New Notifications</p>
    </div>
  </div>
  <button @click="markAllAsRead" class="block w-full bg-gray-800 text-white text-center font-bold py-2">Mark All As Read</button>
</template>

<script>
export default {
   props: ['notifications'],
  data(){
    return{
      
    }
  },
  methods: {
    markAllAsRead(){
      // implement
      console.log('mark all as read')
    }
  },
}
</script>

<style>

</style>
