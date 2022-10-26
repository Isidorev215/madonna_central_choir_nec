<template>
  <div class="single-user-wrapper">
    
    <section class="custom-divider mb-6 flex items-center justify-between">
      <button @click="$router.go(-1)" class="flex items-center justify-start">
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <h1 class="text-lg leading-tight">Back</h1>
      </button>
    </section>

    <div class="inner grid grid-cols-1 md:grid-cols-3 md:gap-4">
      <div class="left col-span-1">
        <div class="profile-card p-4 sm:p-6 xl:p-8 shadow bg-white rounded-lg mb-4">
          <div class="flex md:block xl:flex space-x-2 md:space-x-0 xl:space-x-2">
            <AvatarInitial :image="user?.profileImage" class="mb-2" v-if="user" :name="`${user?.firstName} ${user?.lastName}`" :dimension="80" :rounded="8" />
            <div>
              <h2 class="font-bold text-lg">{{ user?.firstName }} {{ user?.lastName }}</h2>
              <ul class="mt-2">
                <li v-show="user?.occupation" class="text-gray-500 font-normal text-sm flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                  {{ user?.occupation}}
                </li>
                <li v-show="user?.state" class="text-gray-500 font-normal text-sm flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                  {{ user?.state }}{{ user?.state ? ", Nigeria" : "" }}
                </li>
              </ul>
            </div>
          </div>
          <div class="details sm:flex xl:block">
            <div class="flex-1">
              <address class="not-italic font-normal text-sm">
                <div class="mt-4">
                  <div class="header">Email</div>
                  <span class="content font-medium text-sm">{{ user?.email }}</span>
                </div>
                <div class="mt-4">
                  <div class="header">Position</div>
                  <span class="content font-medium text-sm capitalize">{{ user?.membersPosition }}</span>
                </div>

                <div v-show="user?.phone" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Phone</span>
                  </div>
                  <span class="content font-medium text-sm">{{ user?.phone }}</span>
                </div>
                <div v-show="user?.maritalStatus" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Marital Status</span>
                  </div>
                  <span class="content font-medium text-sm">{{ user?.maritalStatus }}</span>
                </div>
                <div v-show="user?.chapter" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Chapter</span>
                  </div>
                  <span class="content font-medium text-sm">{{ user?.chapter }}</span>
                </div>
                <div v-show="user?.choirPart" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Choir Part</span>
                  </div>
                  <span class="content font-medium text-sm">{{ user?.choirPart }}</span>
                </div>
                <div v-show="user?.campus" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Campus</span>
                  </div>
                  <span class="content font-medium text-sm">{{ user?.campus }}</span>
                </div>
                <div v-show="user?.church.churchName" class="mt-4">
                  <div class="header w-full flex justify-between items-center">
                    <span>Church</span>
                  </div>
                  <span v-if="user?.church?.churchName" class="content font-medium text-sm">{{ user?.church?.churchName }} &nbsp;</span>
                  <span v-if="user?.church?.denomination" class="content font-medium text-sm">{{ user?.church?.denomination }} Church</span>
                  <div class="content font-medium text-sm">{{ user?.church?.state }}</div>
                  <div class="content font-medium text-sm">{{ user?.church?.country }}</div>
                </div>
              </address>
            </div>
          </div>
        </div>
        <div class="other-cards">
        </div>
      </div>
      <div class="right col-span-2 flex flex-wrap flex-row -mx-4">
        <div class="flex-shrink max-w-full px-4 w-full mb-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex flex-row justify-between pb-3">
              <div class="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <h3 class="text-base font-bold">Account Creation</h3>
                <span class="flex items-center font-semibold text-base rounded text-gray-400 bg-white"> {{moment(user?.createdAt).format('ll')}}</span>
              </div>
            </div>
            <div class="flex items-center justify-between my-3">
              <img v-if="user?.isApproved" src="@/assets/img/approval-icon.png" alt="approval-icons">
              <img v-else src="@/assets/img/rejected-icon.png" alt="rejection-icons">
              <span 
                class="px-2 py-1 flex items-center font-semibold text-base rounded bg-white"
                :class="[user?.isApproved ? 'border-green-400 text-green-400' : 'text-red-400 border border-red-400 ']"
              >
                {{user?.isApproved ? `Approved on: ${moment(user?.approvedAt).format('ll')}` : 'Awaiting Approval' }}
              </span>
            </div>
            <button class="w-full text-center py-2 text-white rounded disabled:opacity-30" :disabled="user?.isApproved" :class="[user?.isApproved ? 'bg-green-500': 'bg-blue-500']">{{user?.isApproved ? 'Approved' : 'Approve'}}</button>
          </div>                
        </div>
        <div class="flex-shrink max-w-full px-4 w-full mb-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div class="flex flex-row justify-between pb-3">
              <div class="flex flex-col md:flex-row md:justify-between md:items-center w-full">
                <h3 class="text-base font-bold">Regularization</h3>
              </div>
            </div>
            <div class="flex items-center justify-between my-3">
              <img src="@/assets/img/membership-icon.png" alt="approval-icons">
              <span 
                class="px-2 py-1 flex items-center font-semibold text-base rounded bg-white"
                :class="[user?.isregularized ? 'border-green-400 text-green-400' : 'text-red-400 border border-red-400 ']"
              >
                {{user?.isregularized ? `Approved on: ${moment(user?.regularizedAt).format('ll')}` : 'Awaiting Regularization' }}
              </span>
            </div>
            <button class="w-full text-center py-2 text-white rounded disabled:opacity-30" :disabled="user?.isRegularized" :class="[user?.isRegularized ? 'bg-green-500': 'bg-blue-500']">{{user?.isRegularized ? 'Regularized' : 'Regularize'}}</button>
          </div>                
        </div>
      </div>
    </div>
    <Spinner v-if="gettingUser" />
  </div>
</template>

<script setup>
import moment from 'moment';
import { useRoute } from "vue-router";
import getDataObject from "@/composables/getDataObject";
import { onMounted } from "@vue/runtime-core";

const route = useRoute();
const user_id = route.params.id;

const { isPending: gettingUser, error: getUserError, data: user, load: getUser } = getDataObject(`/user/${user_id}`);


onMounted(async() => {
  await getUser();
  if(getUserError.value){
    // do something later on. Toast is inside the composable
  }
})
</script>

<style></style>
