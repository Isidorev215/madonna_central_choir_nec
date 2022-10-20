<template>
  <router-link v-for="position in positions" :key="position._id" :to="`/position/${position._id}`" class="block lg:flex items-center relative cursor-pointer border-b border-gray-300 last:border-none text-black dark:text-white dark:hover:text-slate-400 hover:text-blue-500 py-2 px-3">
    <div class="flex items-center">
      <span class="px-2 transition-colors capitalize">
        {{ position.name }}
      </span>
    </div>
  </router-link>
</template>

<script setup>
  const props = defineProps({
    positions: { type: Array, required: true },
  });
</script>

<style></style>
