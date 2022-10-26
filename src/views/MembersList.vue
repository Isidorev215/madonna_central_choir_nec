<template>
  <div class="members-list-wrapper">
    <section class="members-list bg-white lg:max-w-7xl lg:mx-auto rounded-lg shadow-lg pt-4">
      <div class="top-section flex border-gray-100 border-b-2 justify-between items-center">
        <div class="inner w-full mb-1">
          <div class="search-bar flex flex-col md:flex-row md:justify-between space-y-3 md:space-y-0 p-4">
            <div class="search-wrapper w-full md:w-auto flex mb-0 items-center divide-x divide-gray-400">
              <FormKit 
                form-class="md:pr-3 w-full" 
                type="form" 
                :actions="false" 
                :incomplete-message="false" 
                :config="{ validationVisibility: 'submit' }"
              >
                <FormKit 
                  v-model="filters.searchTerm"
                  type="search" 
                  placeholder="Search by Name" 
                />
              </FormKit>
            </div>
            <div class="buttons-wrapper flex flex-col md:flex-row md:space-x-2">
              <div class="w-full flex items-center md:justify-end space-x-2">
                <FormKit
                  type="select"
                  v-model="filters.approval"
                  :options="[
                    { label: 'Approval Status', value: 'No value' },
                    { label: 'Approved', value: true },
                    { label: 'Awaiting', value: false },
                  ]"
                />
                <FormKit
                  type="select"
                  v-model="filters.regularization"
                  :options="[
                    { label: 'Regularization Status', value: 'No value' },
                    { label: 'Regularized', value: true },
                    { label: 'Faulting', value: false },
                  ]"
                />
              </div>
              <div class="positions-drop dropdown relative" ref="positionsDropRoot">
                <button @click="togglePositionsDrop()" type="button" class="w-auto text-white text-sm text-center py-2.5 px-3 bg-mcc-blue rounded justify-center items-center inline-flex">
                  <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>
                  Positions
                </button>
                <div 
                  :class="{'hidden': positionsDrop === false, 'block': positionsDrop === true }" 
                  class="text-sm mt-3 border-gray-100 border bg-white absolute top-full left-0 min-w-full z-20 rounded shadow-lg lg:dark:bg-slate-800 dark:border-slate-700"
                >
                  <PositionsDropDown :positions="positions"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="table-wrapper flex-col flex">
        <div class="overflow-x-auto">
          <div class="align-middle min-w-full inline-block">
            <div class="shadow overflow-hidden ring">
              <table class="table-fixed min-w-full">
                <thead class="bg-gray-200">
                  <tr>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Name</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Position</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Chapter</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Campus</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Approval</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 py-4">Regularization</th>
                    <th scope="col" class="px-4 py-4"></th>
                  </tr>
                </thead>
                <tbody v-if="filteredUsers.length > 0" class="bg-white divide-y divide-opacity-100 border-gray-300">
                  <tr v-for="user in filteredUsers" :key="user._id" class="border-opacity-100 border-gray-300">
                    <td class="mr-0 p-4 whitespace-nowrap items-center flex space-x-6">
                      <AvatarInitial :image="user.profileImage" :name="`${user.firstName} ${user.lastName}`" :rounded="9999" />
                      <div class="text-opacity-100 text-gray-500 font-normal text-sm">
                        <div class="font-semibold text-base">{{user.firstName}} {{user.lastName}}</div>
                        <div class="font-normal text-sm md:truncate">{{user.email}}</div>
                      </div>
                    </td>
                    <td class="font-normal text-base p-4 whitespace-nowrap capitalize">{{user.membersPosition ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap capitalize">{{user.chapter ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap capitalize">{{user.campus ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div v-if="user.isApproved" class="bg-green-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        <div v-else class="bg-red-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        {{user.isApproved ? 'Approved' : 'Awaiting'}}
                      </div>
                    </td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div v-if="user.isRegularized" class="bg-green-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        <div v-else class="bg-red-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        {{user.isRegularized ? 'Regularized' : 'Faulting'}}
                      </div>
                    </td>
                    <td class="p-4 whitespace-nowrap space-x-2">
                      <button @click="takeActionOnUser = user" type="button" data-modal-toggle="user-modal" class="bg-indigo-500 text-white text-xs px-3 py-1 rounded-sm">more</button>
                    </td>
                  </tr>
                </tbody>
                <tbody class="flex justify-center p-2" v-else>
                  <tr class="w-full p-2 border-l-red-500 border-l-4 bg-red-300">
                    No data available
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrapper px-4">
        <Pagination :total="paginated_res?.total" :perPage="paginated_res?.perPage" :currentPage="currentPage" @pagechanged="onPageChange"  />
      </div>
    </section>

    <teleport to="body">
      <!-- <MembersListQuickAction v-if="takeActionOnUser" :user="takeActionOnUser" @closeModal="takeActionOnUser = null" /> -->
      <SingleUserModal v-if="takeActionOnUser" :user="takeActionOnUser" @closeModal="takeActionOnUser = null" />
    </teleport>
  </div>
</template>

<script setup>
import PositionsDropDown from '@/components/PositionsDropDown.vue';
import MembersListQuickAction from '@/components/Modals/MembersListQuickAction.vue';
import SingleUserModal from '@/components/Modals/SingleUserModal.vue';
import getPaginatedData from '@/composables/getPaginatedData';
import { useToggle } from '@vueuse/core'
import { computed, onMounted, reactive, ref } from "vue";
import { useToast } from 'vue-toastification';
import { useClickOutside } from '@/composables/useClickOutside';
import { useConfigStore } from '../stores/configStore';
import moment from 'moment';

const toast = useToast();
const configStore = useConfigStore();

const currentPage = ref(1);
const positionsDropRoot = ref(null);
const positionsDrop = ref(false);
// filtering values
const filters = reactive({
  searchTerm: "",
  approval: "No value",
  regularization: "No value"
})
const takeActionOnUser = ref(null);

// composables
const { 
  data: users,
  paginated_res,
  error: getUsersError,
  load: getUsers,
  isPending: loading 
} = getPaginatedData('/users', currentPage);
const togglePositionsDrop = useToggle(positionsDrop);
useClickOutside(positionsDropRoot, (e) => {
  positionsDrop.value = false;
})


// computed
const filteredUsers = computed(() => {
  let dateFormatUsers = users.value?.map(user => {
    return {
      ...user, 
      createdAt: user?.createdAt ? moment(user?.createdAt).format('MMMM Do YYYY') : null,
      updatedAt: user?.updatedAt ? moment(user?.updatedAt).format('MMMM Do YYYY') : null,
      birthday: user?.birthday ? moment(user?.birthday).format('MMMM Do YYYY') : null,
      regularizedAt: user?.regularizedAt ? moment(user?.regularizedAt).format('MMMM Do YYYY') : null,
      graduatedAt: user?.graduatedAt ? moment(user?.graduatedAt).format('MMMM Do YYYY') : null,
      approvedAt: user?.approvedAt ? moment(user?.approvedAt).format('MMMM Do YYYY') : null,
    }
  })
  let result = dateFormatUsers.filter(user => {
    let fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(filters.searchTerm.toLowerCase())
  })

  if(filters.approval !== "No value"){
    result = result.filter(user => user.isApproved === filters.approval)
  }
  if(filters.regularization !== "No value"){
    result = result.filter(user => user.isRegularized === filters.regularization)
  }
  return result;
})
const positions = computed(() => {
  return configStore?.config?.positions;
});


const onPageChange = async (page) => {
  currentPage.value = page;
  await getUsers();
  if(getUsersError.value){
    toast.error(`${err.response.data.data.error}`);
  }
}

onMounted(async() => {
  await getUsers();
  if(getUsersError.value){
    // do something later on. Toast is inside the composable
  }
})
</script>

<style>
.backdrop-enter-from,
.backdrop-leave-to{
  opacity: 0;
}

.backdrop-enter-to,
.backdrop-leave-from{
  opacity: 100;
}

.backdrop-enter-active,
.backdrop-leave-active{
  transition: opacity 0.8s ease-in-out;
}
</style>
