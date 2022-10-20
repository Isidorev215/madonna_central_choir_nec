<template>
  <div @click.self="$emit('closeModal')" class="fixed z-spinner overflow-auto top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
    <div class="content bg-white rounded min-w-[300px]">
      <h2 class="w-full bg-gray-400 p-3 text-white text-left px-3">Quick Actions </h2>
      <div class="header border-b p-3">
        <AvatarInitial :image="user?.profileImage" :name="`${user.firstName} ${user.lastName}`" :dimension="80" :rounded="8"/>
        <h3>{{user.firstName}} {{user.lastName}}</h3>
      </div>
      <div class="body p-3">
        <ul class="flex justify-evenly items-center">
          <li>
            <button 
              class=" text-center p-2 text-white rounded disabled:opacity-30" 
              :disabled="user?.isApproved" 
              :class="[user?.isApproved ? 'bg-green-500': 'bg-blue-500']"
            >
              {{user?.isApproved ? 'Approved' : 'Approve'}}
            </button>
          </li>
          <li>
            <button 
              class="text-center p-2 text-white rounded disabled:opacity-30" 
              :disabled="user?.isRegularized" 
              :class="[user?.isRegularized ? 'bg-green-500': 'bg-blue-500']"
            >
              {{user?.isRegularized ? 'Regularized' : 'Regularize'}}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  const emit = defineEmits(['closeModal'])
</script>

<style>

</style>