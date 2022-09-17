<template>
  <div class="card min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg">
    <div class="px-6 py-4">
      <h3 class="f font-medium text-xl">MCC Status</h3>
      <ul class="flex mt-4 flex-wrap lg:space-y-3 space-x-3 lg:space-x-0">
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Regularization</label>
          <div class="content rounded-r px-3 py-1 text-white bg-red-400">Not Done</div>
        </li>
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Last Meeting</label>
          <div class="content rounded-r px-3 py-1 text-white bg-red-400">Absent</div>
        </li>
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Dues</label>
          <div class="content rounded-r px-3 py-1 text-white bg-red-400">Not Current</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: { type: Object, required: true }
})
</script>

<style></style>
