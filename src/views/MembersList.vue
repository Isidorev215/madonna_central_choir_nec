<template>
  <div class="members-list-wrapper">
    <section class="members-list bg-white lg:max-w-7xl lg:mx-auto rounded-lg shadow-lg pt-4">
      <div class="top-section flex border-gray-100 border-b-2 justify-between items-center">
        <div class="inner w-full mb-1">
          <div class="search-bar flex p-4">
            <div class="search-wrapper flex mb-0 items-center divide-x divide-gray-400">
              <FormKit 
                form-class="pr-3" 
                type="form" 
                :actions="false" 
                :incomplete-message="false" 
                :config="{ validationVisibility: 'submit' }"
              >
                <FormKit 
                  v-model="filters.searchTerm"
                  type="search" 
                  label-class="$reset hidden"
                  outer-class="$reset mb-0" 
                  placeholder="Search by Name" 
                  label="Search" 
                />
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
                <thead class="bg-gray-200">
                  <tr>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">Name</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">Position</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">Chapter</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">Campus</th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">
                      <FormKit 
                        type="select"
                        v-model="filters.approval"
                        :options="[
                          { label: 'Approval Status', value: 'No value' },
                          { label: 'Approved', value: true },
                          { label: 'Awaiting', value: false },
                        ]"
                      />
                    </th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">
                      <FormKit 
                        type="select"
                        v-model="filters.dues"
                        :options="[
                          { label: 'Dues Status', value: 'No value' },
                          { label: 'Current', value: true },
                          { label: 'Late', value: false },
                        ]"
                      />
                    </th>
                    <th scope="col" class="uppercase text-gray-600 font-medium text-sm text-left px-4 pt-4">
                      <FormKit 
                        type="select"
                        v-model="filters.regularization"
                        :options="[
                          { label: 'Regularization Status', value: 'No value' },
                          { label: 'Regularized', value: true },
                          { label: 'Faulting', value: false },
                        ]"
                      />
                    </th>
                    <th scope="col" class="px-4 pt-4"></th>
                  </tr>
                </thead>
                <tbody v-if="filteredUsers.length > 0" class="bg-white divide-y divide-opacity-100 border-gray-300">
                  <tr v-for="user in filteredUsers" :key="user._id" class="border-opacity-100 border-gray-300">
                    <td class="mr-0 p-4 whitespace-nowrap items-center flex space-x-6">
                      <img v-if="user.profileImage" class="rounded-full w-10 h-10" src="https://flowbite.com/application-ui/demo/images/users/neil-sims.png" alt="Neil Sims avatar" />
                      <AvatarInitial v-else :name="`${user.firstName} ${user.lastName}`" :rounded="9999" />
                      <div class="text-opacity-100 text-gray-500 font-normal text-sm">
                        <div class="font-semibold text-base">{{user.firstName}} {{user.lastName}}</div>
                        <div class="font-normal text-sm md:truncate">{{user.email}}</div>
                      </div>
                    </td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">{{user.membersPosition ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">{{user.chapter ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">{{user.campus ?? '---'}}</td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div v-if="user.isApproved" class="bg-green-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        <div v-else class="bg-red-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        {{user.isApproved ? 'Approved' : 'Awaiting'}}
                      </div>
                    </td>
                    <td class="font-normal text-base p-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div v-if="user.isCurrentOnDues" class="bg-green-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        <div v-else class="bg-red-400 rounded-full w-[0.625rem] h-[0.625rem] mr-2"></div>
                        {{user.isCurrentOnDues ? 'Current' : 'Late'}}
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
                      <button @click="openDetailsModal(user)" type="button" data-modal-toggle="user-modal" class="text-white font-normal text-sm text-center py-2 px-3 bg-mcc-blue rounded items-center inline-flex active:ring ring-blue-200">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15 11h7v2h-7zm1 4h6v2h-6zm-2-8h8v2h-8zM4 19h10v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h2zm4-7c1.995 0 3.5-1.505 3.5-3.5S9.995 5 8 5 4.5 6.505 4.5 8.5 6.005 12 8 12z"></path></svg>
                        Details
                      </button>
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
    <SingleUserModal v-if="currentUserForModal" :user="currentUserForModal" @closeModal="currentUserForModal = null" />
  </div>
</template>

<script setup>
import SingleUserModal from '@/components/Modals/SingleUserModal.vue';
import getPaginatedData from '@/composables/getPaginatedData';
import { computed, onMounted, reactive, ref } from "vue";
import { useToast } from 'vue-toastification';
import moment from 'moment';

const toast = useToast();

const currentPage = ref(1);
const currentUserForModal = ref(null);
// filtering values
const filters = reactive({
  searchTerm: "",
  approval: "No value",
  dues: "No value",
  regularization: "No value"
})

// composables
const { 
  data: users,
  paginated_res,
  error: getUsersError,
  load: getUsers,
  isPending: loading 
} = getPaginatedData('/users', currentPage)

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
    }
  })
  let result = dateFormatUsers.filter(user => {
    let fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(filters.searchTerm.toLowerCase())
  })
  if(filters.approval !== "No value"){
    result = result.filter(user => user.isApproved === filters.approval)
  }
  if(filters.dues !== "No value"){
    result = result.filter(user => user.isCurrentOnDues === filters.dues)
  }
  if(filters.regularization !== "No value"){
    result = result.filter(user => user.isRegularized === filters.regularization)
  }
  return result;
})

const openDetailsModal = (user) => {
  currentUserForModal.value = user;
}
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
    toast.error(`${err.response.data.data.error}`);
  }
})
</script>

<style></style>
