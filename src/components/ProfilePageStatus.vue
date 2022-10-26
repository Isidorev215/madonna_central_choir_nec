<template>
  <div class="flex flex-wrap lg:shadow-md lg:rounded-lg flex-row mb-8">
    <div class="flex-shrink max-w-full w-full lg:w-2/4 xl:w-1/4 mb-2 lg:mb-0">
      <div class="bg-white dark:bg-gray-800 rounded-lg lg:rounded-none lg:rounded-l-lg shadow-md lg:shadow-none h-full p-6 relative overflow-hidden">
        <h3 class="text-base font-bold mb-2">Account Approval</h3>
        <h2 class="text-3xl font-bold mb-4" :class="[status.approval.isApproved ? 'text-green-500' : 'text-red-400']">{{status.approval.isApproved ? 'Done' : 'Not Done'}}</h2>
        <!-- target -->
        <div class="flex flex-row justify-between w-full">
          <div class="flex items-center" title="Target">
            <img class="w-10 h-10" src="@/assets/img/approval-icon.png" alt="">
            <!-- some text like take action -->
          </div>
          <div class="flex items-center ">{{status.approval.approvedAt ?? 'No Date Available'}}</div>
        </div>

        <!-- bg circle -->
        <div class="absolute -right-16 -top-16">
          <div :class="[status.approval.isApproved ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
        <div class="absolute -right-4 -top-24">
          <div :class="[status.approval.isApproved ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
      </div>
    </div>
    <div class="flex-shrink max-w-full w-full lg:w-2/4 xl:w-1/4 mb-2 lg:mb-0 lg:border-x border-gray-300">
      <div class="bg-white dark:bg-gray-800 rounded-lg lg:rounded-none lg:rounded-l-lg shadow-md lg:shadow-none h-full p-6 relative overflow-hidden">
        <h3 class="text-base font-bold mb-2">Regularisation</h3>
        <h2 class="text-3xl font-bold mb-4" :class="[status.regularization.isRegularized ? 'text-green-500' : 'text-red-400']">{{status.regularization.isRegularized ? 'Done' : 'Not Done'}}</h2>
        <!-- target -->
        <div class="flex flex-row justify-between w-full">
          <div class="flex items-center" title="Target">
            <img class="w-10 h-10" src="@/assets/img/membership-icon.png" alt="">
            <!-- some text like take action -->
          </div>
          <div class="flex items-center ">{{status.regularization.regularizedAt ?? 'No Date Available'}}</div>
        </div>

        <!-- bg circle -->
        <div class="absolute -right-16 -top-16">
          <div :class="[status.regularization.isRegularized ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
        <div class="absolute -right-4 -top-24">
          <div :class="[status.regularization.isRegularized ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
      </div>
    </div>
    <div class="flex-shrink max-w-full w-full lg:w-2/4 xl:w-1/4 mb-2 lg:mb-0 lg:border-x border-gray-300">
      <div class="bg-white dark:bg-gray-800 rounded-lg lg:rounded-none shadow-md lg:shadow-none h-full p-6 relative overflow-hidden">
        <h3 class="text-base font-bold mb-2">Last Meeting</h3>
        <h2 class="text-3xl font-bold mb-4" :class="[status.lastMeeting.attended ? 'text-green-500' : 'text-red-400']">{{status.lastMeeting.attended ? 'Present' : 'Absent'}}</h2>
        <!-- target -->
        <div class="flex flex-row justify-between w-full">
          <div class="flex items-center" title="Target">
            <img src="@/assets/img/meeting-icon.png" class="h-10 w-10">
          </div>
          <div class="flex items-center ">{{moment(status.lastMeeting.details?.scheduledDate).format('ll')}}</div>
        </div>

        <!-- bg circle -->
        <div class="absolute -right-16 -top-16">
          <div :class="[status.lastMeeting.attended ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
        <div class="absolute -right-4 -top-24">
          <div :class="[status.lastMeeting.attended ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
      </div>
    </div>
    <div class="flex-shrink max-w-full w-full lg:w-2/4 xl:w-1/4 mb-2 lg:mb-0">
      <div class="bg-white dark:bg-gray-800 rounded-lg lg:rounded-none lg:rounded-r-lg shadow-md lg:shadow-none h-full p-6 relative overflow-hidden">
        <h3 class="text-base font-bold mb-2">Monthly Dues</h3>
        <h2 class="text-3xl font-bold mb-4" :class="[status.lastDue.paid ? 'text-green-500' : 'text-red-400']">{{status.lastDue.paid ? 'Paid' : 'Unpaid'}}</h2>
        <!-- target -->
        <div class="flex flex-row justify-between w-full">
          <div class="flex items-center" title="Target">
            <img src="@/assets/img/monthly-dues-icon.png" class="h-10 w-10 p-1 rounded-full bg-blue-200 mr-2">
            {{status.lastDue.details?.amount ?? '---'}}
          </div>
          <div class="flex items-center ">{{moment(status.lastDue.details?.due_date).format('ll')}}</div>
        </div>

        <!-- bg circle -->
        <div class="absolute -right-16 -top-16">
          <div :class="[status.lastDue.paid ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
        <div class="absolute -right-4 -top-24">
          <div :class="[status.lastDue.paid ? 'bg-green-500' : 'bg-red-400']" class="opacity-10 w-36 h-36 rounded-full shadow-lg shadow-indigo-500/10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  status: { type: Object, required: true },
});
</script>

<style></style>
