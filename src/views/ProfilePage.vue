<template>
  <div class="flex flex-wrap flex-row">
    <div class="flex-shrink max-w-full px-4 w-full">
      <p class="text-xl font-bold mt-3 mb-5">Profile</p>
    </div>
    <div class="flex-shrink max-w-full px-4 w-full mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md mb-8">
        <div class="group h-40 overflow-hidden relative">
          <img :src="user?.coverImage ? user?.coverImage : defaultImg" class="w-full" />
          <div class="absolute top-4 right-2">
            <button @click="openEditProfileModal" type="button" class="group-hover:opacity-80 opacity-0 py-1.5 px-3 inline-block text-center mb-3 rounded leading-5 text-gray-800 bg-gray-200 border border-gray-200 hover:text-gray-900 hover:bg-gray-300 hover:ring-0 hover:border-gray-300 focus:bg-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0">
              Edit cover
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline-block bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex justify-center -mt-10 relative">
          <a @click="openEditProfileModal" class="z-30 group">
            <AvatarInitial :image="user.profileImage" :name="`${user.firstName} ${user.lastName}`" :dimension="96" :rounded="9999" class="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3" />

            <div title="Change avatar" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-400 p-2 rounded-full text-white dark:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6 bi bi-camera" viewBox="0 0 16 16">
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path>
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              </svg>
            </div>
          </a>
        </div>
        <div class="text-center px-3 pb-6 pt-2 flex justify-center items-center space-x-2">
          <h3 class="text-gray-800 dark:text-gray-100 font-bold text-lg">{{ user?.firstName }} {{ user?.lastName }}</h3>
          <span v-if="user?.roles.includes('Admin')" class="px-2 py-1 flex items-center font-semibold text-xs rounded bg-blue-500 border-blue-500 text-white" :class="[user?.isApproved ? 'success' : 'failure']">Admin</span>
        </div>
      </div>

      <ProfilePageStatus :status="profilePageStatusData" />

      <div class="flex flex-wrap flex-row -mx-4">
        <div class="flex-shrink max-w-full px-4 w-full lg:w-1/3 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full p-6">
            <div class="flex flex-row justify-between pb-3">
              <div class="flex flex-col">
                <h3 class="text-base font-bold">Information</h3>
              </div>
              <div class="relative">
                <a @click="openEditProfileModal" href="javascript:;" title="edit information" class="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="py-3">
              <div class="text-gray-500 mb-2">
                My profile information
              </div>
              <div class="border-t border-gray-200 my-3 dark:border-gray-700"></div>
              <div class="ltr:text-left rtl:text-right">
                <p class="mb-2">
                  <strong>Full Name :</strong>
                  <span class="ml-2">{{ user?.firstName }} {{ user?.lastName }}</span>
                </p>
                <p class="mb-2">
                  <strong>Email :</strong>
                  <span class="ml-2">{{ user?.email }}</span>
                </p>
                <p class="mb-2">
                  <strong>Mobile :</strong>
                  <span class="ml-2">{{ user?.phone ?? "unset" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Occupation :</strong>
                  <span class="ml-2">{{ user?.occupation ?? "unset" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Location :</strong>
                  <span class="ml-2">{{ user?.state ?? "unset" }} {{ user?.state ? user?.country : null }}</span>
                </p>
              </div>
              <div class="border-t border-gray-200 my-3 dark:border-gray-700"></div>
              <div class="ltr:text-left rtl:text-right">
                <p class="mb-2">
                  <strong>Marital status :</strong>
                  <span class="ml-2">{{ user?.maritalStatus ?? "unset" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Chapter :</strong>
                  <span class="ml-2">{{ user?.chapter ?? "unset" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Campus :</strong>
                  <span class="ml-2">{{ user?.campus ?? "unset" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Choir Part :</strong>
                  <span class="ml-2">{{ user?.choirPart ?? "unset" }}</span>
                </p>
                <div class="mb-2">
                  <strong>Church :</strong>
                  <span class="ml-2">{{ user?.church?.churchName ?? "unset" }}</span>
                  <p class="">{{ user?.church?.denomination ? `${user?.church.denomination}, Church`: '' }}</p>
                  <p class="">{{ user?.church?.city ? `${user?.church?.city},` : '' }} {{ user?.church?.state }}.</p>
                  <p class="">{{ user?.church?.country }}.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-shrink max-w-full px-4 w-full lg:w-1/3 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full p-6">
            <div class="flex flex-row justify-between pb-6">
              <div class="flex flex-col">
                <h3 class="text-base font-bold">Recent Meetings</h3>
              </div>
            </div>
            <div class="relative">
              <ol class="h-96 overflow-y-auto scrollbars show mb-6">
                <li v-for="meeting in user.meetings" :key="meeting._id" class="flex">
                  <div class="relative flex-shrink-0 w-12 text-center">
                    <span class="absolute left-1/2 -ml-1 top-10 -bottom-4 border-l-2 border-dashed border-gray-200 dark:border-gray-700"></span>
                    <div class="mr-auto">
                      <img src="@/assets/img/meeting-icon.png" class="h-10 w-10 p-1 rounded-full bg-blue-200" />
                    </div>
                  </div>

                  <div class="ml-2 mb-4">
                    <h3 class="mb-1 w-full flex justify-between items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span>{{ meeting.details?.epoch ? "Start" : meeting.details?.venue }}</span>
                      <span v-if="meeting.attended" class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Present</span>
                      <span v-else class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Absent</span>
                    </h3>
                    <time class="block mb-2 text-xs italic font-normal leading-none text-gray-400 dark:text-gray-500">{{ meeting.details?.epoch ? "----" : moment(meeting.details?.scheduledDate).format("MMMM Do YYYY") }}</time>
                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">{{ meeting.details?.desc ?? "----" }}</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="flex-shrink max-w-full px-4 w-full lg:w-1/3 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full p-6">
            <div class="flex flex-row justify-between pb-6">
              <div class="flex flex-col">
                <h3 class="text-base font-bold">Recent Dues</h3>
              </div>
            </div>
            <div class="relative">
              <ol class="h-96 overflow-y-auto scrollbars show mb-6">
                <li v-for="due in user.dues" :key="due._id" class="flex">
                  <div class="relative flex-shrink-0 w-12 text-center">
                    <span class="absolute left-1/2 -ml-1 top-10 -bottom-4 border-l-2 border-dashed border-gray-200 dark:border-gray-700"></span>
                    <div class="mr-auto">
                      <img src="@/assets/img/monthly-dues-icon.png" class="h-10 w-10 p-1 rounded-full bg-blue-200" />
                    </div>
                  </div>

                  <div class="ml-2 mb-4">
                    <h3 class="mb-1 w-full flex justify-between items-center text-base font-semibold text-gray-900 dark:text-white">
                      <span>{{ due.details?.epoch ? "Start" : due.details?.amount }}</span>
                      <span v-if="due.paid" class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Paid</span>
                      <span v-else class="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Unpaid</span>
                    </h3>
                    <time class="block mb-2 text-xs italic font-normal leading-none text-gray-400 dark:text-gray-500">{{ due.details?.epoch ? "----" : moment(due.details?.duesDateFor).format("MMMM Do YYYY") }}</time>
                    <p class="text-base font-normal text-gray-500 dark:text-gray-400">{{ due.details?.desc ?? "----" }}</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="flex-shrink max-w-full px-4 w-full lg:w-1/3 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="flex flex-row justify-between pb-3">
              <div class="flex flex-col">
                <h3 class="text-base font-bold">Dates</h3>
              </div>
              <div class="relative">
                <a @click="openEditProfileModal" href="javascript:;" title="edit information" class="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200 focus:outline-none hover:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4 bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="py-3">
              <div class="ltr:text-left trl:text-right">
                <p class="mb-2">
                  <strong>Approval: </strong>
                  <span class="ml-2 text-sm">{{ user?.approvedAt }}</span>
                  <span v-if="!user?.approvedAt" class="ml-2 text-sm text-red-500">Account Pending</span>
                </p>
                <p class="mb-2">
                  <strong>Regularization: </strong>
                  <span class="ml-2 text-sm">{{ user?.regularizedAt }}</span>
                  <span v-if="!user?.regularizedAt" title="Requires admin action" class="ml-2 text-sm text-red-500 cursor-help">Admin</span>
                </p>
                <p class="mb-2">
                  <strong>Graduation: </strong>
                  <span class="ml-2 text-sm">{{ user?.graduatedAt ?? "---" }}</span>
                </p>
                <p class="mb-2">
                  <strong>Birthday: </strong>
                  <span class="ml-2 text-sm">{{ user?.birthday ?? "---" }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditProfileModal v-if="isEditProfileModalRevealed" :user="user" @closeModal="closeEditProfileModal" />
  </div>
</template>

<script setup>
import ProfilePageStatus from "@/components/ProfilePageStatus.vue";
import EditProfileModal from "@/components/Modals/EditProfileModal.vue";
import { computed } from "@vue/runtime-core";
import { useConfigStore } from '../stores/configStore';
import { useConfirmDialog } from "@vueuse/core";

// statics
import defaultImg from '@/assets/img/default_profile_cover.jpg'

const configStore = useConfigStore();

const { isRevealed: isEditProfileModalRevealed, reveal: openEditProfileModal, cancel: closeEditProfileModal } = useConfirmDialog();

const user = computed(() => {
  return configStore?.user;
});

const profilePageStatusData = computed(() => {
  return {
    lastMeeting: user.value?.meetings[user.value?.meetings.length - 1],
    lastDue: user.value?.dues[user.value?.dues.length - 1],
    approval: {
      isApproved: user.value?.isApproved,
      approvedAt: user.value?.approvedAt
    },
    regularization: {
      isRegularized: user.value?.isRegularized,
      regularizedAt: user.value?.regularizedAt,
    },
  };
});
</script>

<style>
.tooltiptext {
  @apply hidden group-hover:inline-block bg-gray-800 text-white text-center px-2 py-1 rounded-sm absolute w-32 top-[100%] left-[50%] -ml-[calc(128px/2)] z-[1];
}
.tooltiptext::after {
  @apply content-[""] absolute bottom-[100%] left-[50%] -mt-1 border-4 border-solid border-t-transparent border-r-transparent border-b-gray-800 border-l-transparent;
}
</style>
