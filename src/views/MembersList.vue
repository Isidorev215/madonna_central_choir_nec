<template>
  <div class="members-list-wrapper">
    <section class="members-list bg-white lg:max-w-7xl lg:mx-auto rounded-lg shadow-lg pt-4">
      <div class="top-section flex border-gray-100 border-b-2 justify-between items-center">
        <div class="inner w-full mb-1">
          <div class="search-bar flex p-4">
            <div class="search-wrapper flex mb-0 items-center divide-x divide-gray-400">
              <FormKit form-class="pr-3" type="form" :actions="false" :incomplete-message="false" :config="{ validationVisibility: 'submit' }">
                <FormKit type="search" label-class="$reset hidden" placeholder="Search for a user" label="Search" />
              </FormKit>
              <div class="icons pl-2 mt-0 flex space-x-1">
                <a class="text-gray-600 p-1 rounded justify-center cursor-pointer inline-flex">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </a>
              </div>
            </div>
            <div class="buttons-wrapper flex ml-auto items-center space-x-2">
              <button class="w-auto text-white font-medium text-sm text-center py-2 px-3 bg-mcc-blue rounded-lg justify-center items-center inline-flex">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Create Admin
              </button>
              <button class="w-auto text-white font-medium text-sm text-center py-2 px-3 bg-mcc-blue rounded-lg justify-center items-center inline-flex">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>
                Update Positions
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="table-wrapper flex-col flex">
        <div class="overflow-x-auto">
          <div class="align-middle min-w-full inline-block">
            <div class="shadow overflow-hidden ring">
              <table class="table-fixed min-w-full">
                <thead class="bg-gray-300">
                  <tr>
                    <th scope="col" class="uppercase text-gray-500 font-medium text-xs text-left p-4">Name</th>
                    <th scope="col" class="uppercase text-gray-500 font-medium text-xs text-left p-4">Position</th>
                    <th scope="col" class="uppercase text-gray-500 font-medium text-xs text-left p-4">Country</th>
                    <th scope="col" class="uppercase text-gray-500 font-medium text-xs text-left p-4">Status</th>
                    <th scope="col" class="p-4"></th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-opacity-100 border-gray-300">
                  <tr v-for="user in 5" :key="user" class="border-opacity-100 border-gray-300">
                    <td class="mr-0 p-4 whitespace-nowrap items-center flex space-x-6">
                      <img class="rounded-full w-10 h-10" src="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" alt="Neil Sims avatar" />
                      <div class="text-opacity-100 text-gray-500 font-normal text-sm">
                        <div class="font-semibold text-base">Neil Sims</div>
                        <div class="font-normal text-sm">neil.sims@flowbite.com</div>
                      </div>
                    </td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">Front-end developer</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">United States</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="b bg-green-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        Active
                      </div>
                    </td>
                    <td class="p-4 whitespace-nowrap space-x-2">
                      <button type="button" data-modal-toggle="user-modal" class="text-white font-normal text-sm text-center py-2 px-3 bg-mcc-blue rounded items-center inline-flex active:ring ring-blue-200">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                        </svg>
                        Edit user
                      </button>
                      <button type="button" data-modal-toggle="delete-user-modal" class="text-white font-normal text-sm text-center py-2 px-3 bg-mcc-blue rounded items-center inline-flex active:ring ring-blue-200">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                        Delete user
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper px-4">
        <Pagination :total="35" :perPage="10" :currentPage="2" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const query = ref("");

const resetQuery = () => {
  query.value = "";
};
</script>

<style></style>
