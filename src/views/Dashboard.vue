<template>
  <section class="dasboard">
    <section class="custom-divider mb-6 flex items-center justify-between">
      <div class="flex items-center justify-start">
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
          <svg viewBox="0 0 24 24" width="20" height="20" class="inline-block">
            <path fill="currentColor" d="M3,14L3.5,14.07L8.07,9.5C7.89,8.85 8.06,8.11 8.59,7.59C9.37,6.8 10.63,6.8 11.41,7.59C11.94,8.11 12.11,8.85 11.93,9.5L14.5,12.07L15,12C15.18,12 15.35,12 15.5,12.07L19.07,8.5C19,8.35 19,8.18 19,8A2,2 0 0,1 21,6A2,2 0 0,1 23,8A2,2 0 0,1 21,10C20.82,10 20.65,10 20.5,9.93L16.93,13.5C17,13.65 17,13.82 17,14A2,2 0 0,1 15,16A2,2 0 0,1 13,14L13.07,13.5L10.5,10.93C10.18,11 9.82,11 9.5,10.93L4.93,15.5L5,16A2,2 0 0,1 3,18A2,2 0 0,1 1,16A2,2 0 0,1 3,14Z"></path>
          </svg>
        </span>
        <h1 class="text-lg leading-tight">Overview</h1>
      </div>
    </section>

    <div class="flex flex-wrap flex-row">
      <div class="left-side flex-shrink max-w-full w-full order-2 md:order-1 xl:w-2/3">
        <div class="flex flex-wrap flex-row">
          <div v-for="card in 4" :key="card" class="flex-shrink max-w-full px-2 w-full sm:w-1/2 mb-3">
            <div class="bg-white dark:bg-gray-800 rounded shadow h-full p-6">
              <div class="flex flex-wrap flex-row items-center">
                <div class="flex-shrink max-w-full w-1/2">
                  <h5 class="text-gray-500 mb-1">Total view</h5>
                  <h3 class="text-lg font-bold mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline-block ltr:mr-2 rtl:ml-2 -mt-1 bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                    </svg>
                    143.210
                  </h3>
                  <p class="text-sm text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block w-4 h-4 bi bi-arrow-up-short" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"></path>
                    </svg>
                    46.2%
                  </p>
                </div>
                <div class="flex-shrink max-w-full w-1/2 text-right">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-shrink max-w-full px-2 w-full sm:w-1/2 mb-3">
            <div class="card bg-white dark:bg-gray-800 rounded shadow h-full p-6">
              <div class="w-full">
                <div class="">
                  <div class="flex flex-col text-center mb-6">
                    <h3>Next Meeting</h3>
                    <h4 class="text-xl font-bold text-gray-800 dark:text-gray-300">28 days left</h4>
                    <img class="mx-auto max-w-full w-36 h-36" src="@/assets/svg/launching-flag.svg" />
                    <p class="text-sm text-gray-500">September 05, 2025</p>
                  </div>
                  <div class="w-full overflow-auto max-h-40">
                    <table class="table-sm text-xs w-full ltr:text-left rtl:text-right mt-4">
                      <thead>
                        <tr class="border-b dark:border-gray-700">
                          <th class="px px-2 py-3 whitespace-nowrap align-middle text-left">Details</th>
                          <th class="px px-2 py-3 whitespace-nowrap align-middle text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="details in 3" :key="details">
                          <td class="px px-2 py-3 whitespace-nowrap align-middle text-left">Venue</td>
                          <td class="px px-2 py-3 whitespace-nowrap align-middle text-left">
                            <div class="flex items-center">
                              <span class="ltr:mr-2 rtl:ml-2">78%</span>
                              <div class="relative w-full">
                                <div class="overflow-hidden h-2 text-xs flex rounded bg-indigo-300">
                                  <div style="width: 78%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="flex-shrink max-w-full px-2 w-full mb-3">
            To add any card to the grid, you just make a new flex-shrink and give it 
            an appropiate fractional width
          </div> -->
        </div>
      </div>

      <div class="right-side flex-shrink max-w-full px-2 w-full order-1 md:order-2 xl:w-1/3 mb-3">
        <div class="positions_for_admin card rounded shadow bg-white">
          <div class="relative flex flex-col min-w-0 break-words w-full rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
              <div class="flex flex-wrap items-center">
                <div class="relative w-full max-w-full flex-grow flex-1">
                  <h3 class="font-semibold text-base text-blueGray-700">Positions</h3>
                </div>
                <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                  <button @click="openPositionModal" class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Create Position</button>
                  <CreatePositionModal v-if="isPositionModalRevealed" @closeModal="closePositionModal" />
                </div>
              </div>
            </div>
            <div class="w-full overflow-auto">
              <table class="w-full items-center bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th class="px-6 bg-gray-50 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Position</th>
                    <th class=" bg-gray-50 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">No. of Holders</th>
                    <th class="px-6 bg-gray-50 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                  </tr>
                </thead>
                <tbody v-if="config?.positions.length > 0">
                  <tr v-for="position in config.positions" :key="position">
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left capitalize">{{position.name}}</th>
                    <td class="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{{ position.holders.length > 0 ? position.holders.length : 'Empty' }}</td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center justify-end">
                        <router-link :to="{ name: 'PositionDetails', params: { id: position._id} }" class="bg-indigo-500 text-white text-xs px-3 py-1 rounded-sm">more</router-link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex justify-center p-2" v-if="config?.positions.length === 0">
                <div class="w-full p-2 border-l-red-800 border-l-4 bg-red-500 text-white">
                  You are yet to create positions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CreatePositionModal from "@/components/Modals/CreatePositionModal.vue";
import { computed, ref } from "@vue/runtime-core";
import { useConfirmDialog } from "@vueuse/core";
import { useStore } from "vuex";
  
  const store = useStore();
  const config = computed(() => {
    return store.getters?.formattedConfig;
  });

  const { isRevealed: isPositionModalRevealed, reveal: openPositionModal, cancel: closePositionModal } = useConfirmDialog();
  
  


</script>

<style></style>
