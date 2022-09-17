<template>
  <div class="card min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg">
    <div class="px-6 py-4">
      <h3 class="font-medium text-xl">Dates</h3>
      <div class="flex-1">
        <ul class="not-italic font-normal text-sm">
          <li class="mt-4">
            <div class="header w-full flex justify-between items-center"><span>Birthday</span><span>Add</span></div>
            <span class="content font-medium text-sm"></span>
          </li>
          <li class="mt-4">
            <div class="header w-full flex justify-between items-center"><span>Graduation</span><span>Add</span></div>
            <span class="content font-medium text-sm"></span>
          </li>
          <li class="mt-4">
            <div class="header w-full flex justify-between items-center"><span>Regularization</span><span class="text-red-400">Admin action</span></div>
            <span class="content font-medium text-sm"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: Object, required: true }
})
</script>

<style></style>
