<template>
  <div class="card relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg mt-16">
    <div class="px-6 pb-4">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center -mt-16">
          <div class="relative w-24 h-24 md:w-36 md:h-36">
            <AvatarInitial :image="user.profileImage" :name="`${user.firstName} ${user.lastName}`" :rounded="9999" :dimension="100" dimensionType="percent" />
          </div>
        </div>
        <div class="flex flex-col justify-center items-start space-y-2 mt-5 w-full">
          <div class="top w-full">
            <h2 class="font-bold text-xl leading-7 flex justify-between">
              <span>{{user?.firstName}} {{user?.lastName}}</span>
            </h2>
            <ul class="mt-2">
              <li class="mb-1 font-normal text-gray-600 text-sm leading-5 flex justify-between items-center">
                <span class="flex items-center"
                  ><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                  Occupation
                </span>
                {{ user?.occupation ?? "---" }}
              </li>
              <li class="mb-1 font-normal text-gray-600 text-sm leading-5 flex justify-between items-center">
                <span class="flex items-center"
                  ><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg> Location
                </span>
                {{ user?.state ?? "---" }} {{ user?.state ? user?.country : null }}
              </li>
            </ul>
          </div>
          <div class="middle w-full">
            <div class="flex-1">
              <address class="not-italic font-normal text-sm">
                <div class="mt-2">
                  <div class="header font-medium">Email:</div>
                  <span class="content text-sm">{{ user?.email }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Phone:</span>
                    <span v-if="!user?.phone">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.phone ?? "" }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Marital Status:</span>
                    <span v-if="!user?.maritalStatus">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.maritalStatus ?? "" }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Chapter:</span>
                    <span v-if="!user?.chapter">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.chapter ?? "" }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Choir Part:</span>
                    <span v-if="!user?.choirPart">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.choirPart ?? "" }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Campus:</span>
                    <span v-if="!user?.campus">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.campus ?? "" }}</span>
                </div>
                <div class="mt-2">
                  <div class="header font-medium w-full flex justify-between items-center">
                    <span>Church:</span>
                    <span v-if="!user?.church.churchName">---</span>
                  </div>
                  <span class="content text-sm">{{ user?.church?.churchName ?? "" }}</span>
                  <p class="">{{ user?.church?.denomination ? `${user?.church.denomination}, Church`: '' }}</p>
                  <p class="">{{ user?.church?.city ? `${user?.church?.city},` : '' }} {{ user?.church?.state }}.</p>
                  <p class="">{{ user?.church?.country }}.</p>
                </div>
              </address>
            </div>
          </div>
        </div>
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
