<template>
  <section class="p-6 lg:max-w-7xl lg:mx-auto">
    <div class="px-2 md:px-4 mx-auto w-full">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-8/12 px-4">
          <FormKit 
            form-class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0"
            type="form"
            :actions="false"
            :incomplete-message="false"
            :config="{ validationVisibility: 'submit' }"
            :disabled="updating"
            v-model="profileUpdateForm"
            @submit="submitUpdate"
          >
            <div class="rounded-t bg-mcc-light-gray mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-blueGray-700 text-xl font-bold">Edit Information</h6>
                <button type="submit" class="flex items-center bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  <svg v-if="updating" class="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="updating">Updating...</span>
                  <span v-else>Update</span>
                </button>
              </div>
            </div>

            <div class="flex-auto px-2 lg:px-5 p-8">
              <div class="flex flex-wrap">
                <FormKit 
                  type="text"
                  label="First Name"
                  name="firstName"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="text"
                  label="Last Name"
                  name="lastName"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="text"
                  label="Occupation"
                  name="occupation"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="tel"
                  label="Phone"
                  name="phone"
                  placeholder="08012345689"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="text"
                  label="State"
                  name="state"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="text"
                  label="Country"
                  name="country"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
              </div>
              <hr class="my-3 border-b-1 border-blueGray-300" />
              <div class="flex flex-wrap">
                <FormKit 
                  type="select"
                  label="Marital Status"
                  name="marital_status"
                  :options="[
                    { label: 'Marital Status', value: undefined },
                    { label: 'Married', value: 'Married' },
                    { label: 'Single', value: 'Single' },
                    { label: 'Clergy', value: 'Clergy' },
                  ]"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="select"
                  label="Campus"
                  name="campus"
                  :options="[
                    { label: 'Campus', value: undefined },
                    { label: 'Elele', value: 'Elele' },
                    { label: 'Akpugo', value: 'Akpugo' },
                    { label: 'Okija', value: 'Okija' },
                  ]"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="select"
                  label="Choir Part"
                  name="choirPart"
                  :options="[
                    { label: 'Choir Part', value: undefined },
                    { label: 'Soprano', value: 'Soprano' },
                    { label: 'Alto', value: 'Alto' },
                    { label: 'Tenor', value: 'Tenor' },
                    { label: 'Bass', value: 'Bass' },
                  ]"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="text"
                  label="Chapter"
                  name="chapter"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />

                <FormKit
                  type="group"
                  name="church"
                >
                  <FormKit 
                    type="text"
                    label="Church Name (Local Parish)"
                    name="churchName"
                    :value="config?.church?.churchName"
                    outer-class="w-full lg:w-6/12 px-4"
                    wrapper-class="relative w-full mb-3"
                    validation-visibility="blur"
                  />
                  <FormKit 
                    type="text"
                    label="Denomination"
                    name="denomination"
                    :value="config?.church?.denomination"
                    outer-class="w-full lg:w-6/12 px-4"
                    wrapper-class="relative w-full mb-3"
                    validation-visibility="blur"
                  />
                  <FormKit 
                    type="text"
                    label="State (Church)"
                    name="state"
                    :value="config?.church?.state"
                    outer-class="w-full lg:w-6/12 px-4"
                    wrapper-class="relative w-full mb-3"
                    validation-visibility="blur"
                  />
                  <FormKit 
                    type="text"
                    label="Country (Church)"
                    name="country"
                    :value="config?.church?.country"
                    outer-class="w-full lg:w-6/12 px-4"
                    wrapper-class="relative w-full mb-3"
                    validation-visibility="blur"
                  />
                </FormKit>

                <FormKit 
                  type="date"
                  label="Graduation Date"
                  name="graduatedAt"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
                <FormKit 
                  type="date"
                  label="Birthday"
                  name="birthday"
                  outer-class="w-full lg:w-6/12 px-4"
                  wrapper-class="relative w-full mb-3"
                  validation-visibility="blur"
                />
              </div>
              <hr class="my-3 border-b-1 border-blueGray-300" />
            </div>
          </FormKit>
        </div>
        <div class="w-full lg:w-4/12 px-4">
          <div class="card relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg mt-16">
            <div class="px-6 pb-4">
              <div class="flex flex-wrap justify-center">
                <div class="w-full px-4 flex justify-center -mt-16">
                  <div class="relative w-24 h-24 md:w-36 md:h-36">
                    <img src="https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&amp;options[accessoriesChance]=93" alt="John Doe" class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" />
                    <div class="absolute right-0 bottom-0">
                      <div class="flex items-stretch justify-start relative">
                        <label class="inline-flex">
                          <a class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded-full border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 p-1 w-12 h-12" disabled="false">
                            <span class="inline-flex justify-center items-center w-6 h-6">
                              <svg viewBox="0 0 24 24" width="24" height="24" class="inline-block"><path fill="currentColor" d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"></path></svg></span>
                              <!---->
                          </a>
                          <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1" />
                        </label>
                        <!---->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col justify-center items-start space-y-2 mt-5 w-full">
                  <div class="top w-full">
                    <h2 class="font-bold text-xl leading-7 flex justify-between">
                      <span>{{config?.firstName}} {{config?.lastName}}</span>
                      <div v-if="config?.isAdmin" class="inline-flex items-center capitalize leading-none text-xs border rounded-full py-1 px-3 bg-blue-500 border-blue-500 text-white">
                        <span>Admin</span>
                      </div>
                    </h2>
                    <ul class="mt-2">
                      <li class="mb-1 font-normal text-gray-600 text-sm leading-5 flex justify-between items-center">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                          Occupation
                        </span>
                        {{config?.occupation ?? 'Add'}}
                      </li>
                      <li class="mb-1 font-normal text-gray-600 text-sm leading-5 flex justify-between items-center">
                        <span class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                          Location
                        </span>
                        {{`${config?.state},` ?? 'Add'}} {{config?.state ? config?.country : null}}
                      </li>
                    </ul>
                  </div>
                  <div class="middle w-full">
                    <div class="flex-1">
                      <address class="not-italic font-normal text-sm">
                        <div class="mt-4">
                          <div class="header">Email</div>
                          <span class="content font-medium text-sm">{{config?.email}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Phone</span>
                            <span v-if="!config?.phone">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{config?.phone}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Marital Status</span>
                            <span v-if="!config?.marital_status">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{config?.marital_status}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Chapter</span>
                            <span v-if="!config?.chapter">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{config?.chapter}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Choir Part</span>
                            <span v-if="!config?.choirPart">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{config?.choirPart}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Campus</span>
                            <span v-if="!config?.campus">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{config?.campus}}</span>
                        </div>
                        <div class="mt-4">
                          <div class="header w-full flex justify-between items-center">
                            <span>Church</span>
                            <span v-if="!config?.church?.churchName">Add</span>
                          </div>
                          <span class="content font-medium text-sm">{{`${config?.church?.churchName}, `}}</span>
                          <span class="content font-medium text-sm">{{config?.church?.denomination}} Church</span>
                          <div class="content font-medium text-sm">{{config?.church?.state}}</div>
                          <div class="content font-medium text-sm">{{config?.church?.country}}</div>
                        </div>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg">
            <div class="px-6 py-4">
              <h3 class="font-medium text-xl">Dates</h3>
              <div class="flex-1">
                <ul class="not-italic font-normal text-sm">
                  <li class="mt-4">
                    <div class="header w-full flex justify-between items-center">
                      <span>Birthday</span>
                      <span v-if="!config?.birthday">Add</span>
                    </div>
                    <span class="content font-medium text-sm">{{config?.birthday}}</span>
                  </li>
                  <li class="mt-4">
                    <div class="header w-full flex justify-between items-center">
                      <span>Graduation</span>
                      <span v-if="!config?.graduatedAt">Add</span>
                    </div>
                    <span class="content font-medium text-sm">{{config?.graduatedAt}}</span>
                  </li>
                  <li class="mt-4">
                    <div class="header w-full flex justify-between items-center">
                      <span>Regularization</span>
                      <span v-if="!config?.RegularizedAt" class="text-red-400">Admin action</span>
                    </div>
                    <span class="content font-medium text-sm">{{config?.RegularizedAt}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card min-w-0 break-words bg-white w-full mb-6 shadow rounded-lg">
            <div class="px-6 py-4">
              <h3 class="f font-medium text-xl">MCC Status</h3>
              <ul class="flex mt-4 flex-wrap space-y-2 space-r-2">
                <li class="text-sm flex justify-start items-stretch">
                  <label class="rounded-l py-1 px-3 bg-gray-200">Regularization</label>
                  <div class="content rounded-r px-3 py-1 text-white" :class="[config?.isRegularized ? 'bg-green-400' : 'bg-red-400']">{{config?.isRegularized ? 'Done' : 'Not Done'}}</div>
                </li>
                <li class="text-sm flex justify-start items-stretch">
                  <label class="rounded-l py-1 px-3 bg-gray-200">Last Meeting</label>
                  <div class="content rounded-r px-3 py-1 text-white" :class="[config?.attendedLastMeeting ? 'bg-green-400' : 'bg-red-400']">{{config?.attendedLastMeeting ? 'Present' : 'Absent'}}</div>
                </li>
                <li class="text-sm flex justify-start items-stretch">
                  <label class="rounded-l py-1 px-3 bg-gray-200">Dues</label>
                  <div class="content rounded-r px-3 py-1 text-white" :class="[config?.isCurrentOnDues ? 'bg-green-400' : 'bg-red-400']">{{config?.isCurrentOnDues ? 'Current' : 'Not Current'}}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useUpdateDocument from '@/composables/useUpdateDocument';

const store = useStore();
const router = useRouter();

// composables
const { isPending: updating, error: updatingError, updateDocument } = useUpdateDocument();


const profileUpdateForm = reactive({});

const config = computed(() => {
  return store.getters?.formattedConfig;
});

const submitUpdate = async () => {
  await updateDocument('/profile/update', profileUpdateForm)
  if(!updatingError.value){
    router.go();
  }
}
</script>

<style></style>
