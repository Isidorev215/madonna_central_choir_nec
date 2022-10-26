<template>
  <div class="card min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg">
    <div class="px-6 py-4">
      <h3 class="f font-medium text-xl">MCC Status</h3>
      <ul class="flex flex-col mt-4 flex-wrap space-y-3">
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Approval</label>
          <div v-if="user.isApproved" class="content rounded-r px-3 py-1 text-white bg-green-400">Done</div>
          <div v-else class="content rounded-r px-3 py-1 text-white bg-red-400">Not Done</div>
        </li>
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Regularization</label>
          <div v-if="user.isRegularized" class="content rounded-r px-3 py-1 text-white bg-green-400">Done</div>
          <div v-else class="content rounded-r px-3 py-1 text-white bg-red-400">Not Done</div>
        </li>
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Last Meeting</label>
          <div v-if="user?.meetings[user?.meetings.length - 1].attended" class="content rounded-r px-3 py-1 text-white bg-green-400">Present</div>
          <div v-else class="content rounded-r px-3 py-1 text-white bg-red-400">Absent</div>
        </li>
        <li class="text-sm flex justify-start items-stretch">
          <label class="rounded-l py-1 px-3 bg-gray-200">Dues</label>
          <div v-if="user?.dues[user?.dues.length - 1].paid" class="content rounded-r px-3 py-1 text-white bg-green-400">Current</div>
          <div v-else class="content rounded-r px-3 py-1 text-white bg-red-400">Not Current</div>
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
