<template>
  <div class="position-details">
    <section class="custom-divider md:px-4 mb-6 flex items-center justify-between">
      <button @click="$router.go(-1)" class="flex items-center justify-start">
        <span class="inline-flex justify-center items-center w-8 h-8 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <h1 class="text-lg leading-tight">Back</h1>
      </button>
    </section>

    <FormKit 
      type="form" 
      form-class="$reset grid grid-cols-3 gap-3" 
      :actions="false" 
      :incomplete-message="false" 
      v-model="updatePositionFormData" 
      :config="{ validationVisibility: 'submit' }"
      @submit="editPosition(position._id)"
    >
      <div class="left col-span-3 lg:col-span-2 flex flex-col justify-start items-start space-y-3 md:px-4">
        <div class="w-full">
          <div class="bg-white rounded shadow-s1 p-3 lg:p-5">
            <h2 class="text-lg font-semibold mb-2 capitalize">{{ position.name }}</h2>
            <p class="mb-4">{{ position.desc }}</p>

            <div class="mb-2 w-full flex justify-between items-center">
              <h2 class="text-lg font-semibold">Holders</h2>
              <div class="text-xs md:text-sm flex justify-start items-stretch">
                <span class="rounded-l py-1 px-3 bg-gray-200">Maximum no. of Holders</span>
                <span class="content rounded-r px-3 py-1 text-white bg-green-400">{{ position.allowedHolders }}</span>
              </div>
            </div>
            <ul v-if="position.holders > 0" class="current-holders-list">
              <li v-for="holder in position.holders" :key="holder._id" class="flex space-y-3 last:mb-6">
                <div class="flex-auto w-[200px] lg:w-[250px] flex justify-start items-center space-x-2">
                  <AvatarInitial :name="`${holder.firstName} ${holder.lastName}`" :dimension="35" :rounded="9999" class="w-14 h-auto align-middle" />
                  <div class="desc flex flex-col justify-center items-start">
                    <strong class="text-base font-normal">{{holder.firstName}} {{holder.lastName}}</strong>
                  </div>
                </div>
              </li>
            </ul>
            <div class="text-sm  text-red-500 mb-2" v-else>
              ** No user is currently assigned to this position **
            </div>

            <h2 class="text-lg font-semibold mb-2">Duties</h2>
            <ol class="duties_list p-0 m-0 list-none" v-if="position.duties && position.duties.length > 0">
              <div v-for="(duty, index) in position.duties" :key="index" class="py-2 border-b last:border-b-0 dark:border-gray-700 flex items-center justify-between">
                <li>{{ duty }}</li>
              </div>
            </ol>
          </div>
        </div>

        <div class="select-users w-full grid grid-cols-1 gap-3 lg:gap-8 p-3 lg:p-5 bg-white rounded shadow-s1">
          <div class="heading flex justify-between items-center">
            <h2 class="text-lg leading-tight">Select User(s) for this Position</h2>
            <div class="w-5/12 input-wrapper h-10 pl-2 border border-gray-400 rounded-md hidden lg:flex justify-center items-center space-x-2 bg-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input class="w-full h-full px-2 focus:outline-none" type="search" placeholder="Search by Name" v-model="searchTerm" />
            </div>
          </div>
          <div class="users-list">
            <div class="flex flex-col justify-start items-start space-y-4">
              <div class="prime-check flex justify-start items-center space-x-3 lg:space-x-6">
                <input class="flex-none h-4 lg:h-5 w-4 lg:w-5 accent-normal-green" type="checkbox" name="primeCheckBox" id="primeCheckBox" ref="primeCheckBox" @click="primeClicked($event)" />
                <label class="text-lg" for="primeCheckBox">Select All</label>
              </div>

              <ul class="w-full flex flex-col justify-start items-start space-y-3 lg:space-y-4 max-h-[500px] overflow-y-auto">
                <li class="flex justify-start items-center space-x-3 lg:space-x-5" v-for="user in filteredUsers" :key="user._id">
                  <input class="flex-none h-4 lg:h-5 w-4 lg:w-5 accent-normal-green" type="checkbox" ref="userCheckBoxes" :id="user._id" @click="selectUser($event, user._id)" />
                  <label class="flex-auto w-[200px] lg:w-[250px] flex justify-start items-center space-x-2" :for="user._id">
                    <AvatarInitial :image="user.profileImage" :name="`${user.firstName} ${user.lastName}`" :dimension="35" :rounded="9999" class="w-14 h-auto align-middle" />
                    <div class="desc flex flex-col justify-center items-start">
                      <strong class="text-base font-normal">{{ user.firstName }} {{ user.lastName }}</strong>
                    </div>
                  </label>
                </li>
              </ul>
              <div class="pagination-wrapper w-full">
                <Pagination :total="paginated_res?.total" :perPage="paginated_res?.perPage" :currentPage="currentPage" @pagechanged="onPageChange" />
              </div>
              <button type="submit" class="w-full p-3 bg-mcc-blue text-white font-medium flex lg:hidden justify-center items-center rounded-md">Submit ({{ selectedUsers.length }} selected users)</button>
            </div>
          </div>
        </div>

        <div class="form-fields w-full grid grid-cols-1 gap-3 lg:gap-8 p-3 lg:p-5 bg-white rounded shadow-s1">
          <div class="heading flex justify-between items-center">
            <h2 class="text-lg leading-tight">Edit Position</h2>
          </div>
          <div class="w-full grid grid-cols-1 gap-1">
            <FormKit 
              type="text"
              :value="position.name"
              name="name"
              label="Position Name"
              help="Add a positon for the organization"
              outer-class="mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 font-medium text-base"
              validation="required"
              validation-visibility="blur"
            />

            <FormKit 
              type="textarea"
              :value="position.desc"
              name="desc"
              label="A short description of this position"
              outer-class="mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 font-medium text-base"
              validation="required"
              validation-visibility="blur"
            />
            
            <FormKit 
              type="checkbox"
              label="Limit Holders"
              label-class="$reset block mb-1 font-medium text-base"
              help="Check to edit limit for the holders of this position"
              :ignore="true"
              v-model="toggleAllowedHolders"
            />

            <FormKit 
              v-if="toggleAllowedHolders"
              :value="isNaN(Number(position.allowedHolders)) ? '' : position.allowedHolders"
              type="number"
              name="allowedHolders"
              label="Allowed Holders"
              help="Add the number of holders allowed for the position"
              min="1"
              step="1"
              outer-class="mb-2"
              wrapper-class="$reset w-2/3 flex flex-col justify-start"
              label-class="$reset block mb-1 font-medium text-base"
              validation="required|min:1"
              validation-visibility="blur"
            />

            <FormKit
              type="list"
              name="duties"
            >

              <FormKit
                v-for="(duty, index) in editablePosition.duties"
                :key="duty.id"
                :value="duty.value"
                :name="duty.id"
                type="text"
                placeholder="Responsible for ..."
                suffix-icon="close"
                outer-class="mb-2"
                wrapper-class="$reset w-full flex flex-col justify-start"
                label-class="$reset block mb-1 font-medium text-base"
                @suffix-icon-click="removeDutyInput(index)"
                validation="required"
              >
                <template v-if="index === 0" #label="context">
                  <div class="w-full mb-2 label-wrapper flex justify-between items-end">
                    <label class="block font-medium text-base" :for="context.id">Duties</label>
                    <button @click="addDutyInput" class="bg-gray-300 rounded px-2 py-1 text-gray-600 text-sm" type="button">Add Duty +</button>
                  </div>
                </template>
              </FormKit>
            </FormKit>
          </div>
        </div>
      </div>
      <div class="right col-span-1 hidden lg:flex flex-col justify-start items-start space-y-3 max-h-[calc(100vh-80px)] bg-white px-4 py-5 border-l border-dark-gray-2">
        <h2 class="font-semibold text-xl">Selected Contacts ({{ selectedUsers.length }})</h2>
        <ul class="w-full flex flex-col justify-start items-start space-y-4 h-full overflow-y-auto">
          <li class="w-full flex justify-between items-center space-x-6" v-for="user in selectedUsers" :key="user._id">
            <div class="flex-auto w-[250px] flex justify-start items-start space-x-2">
              <AvatarInitial :name="`${user.firstName} ${user.lastName}`" :dimension="35" :rounded="9999" class="w-14 h-auto align-middle" />
              <div class="desc flex flex-col justify-center items-start">
                <strong class="text-base font-normal">{{ user.firstName }} {{ user.lastName }}</strong>
              </div>
            </div>
            <button @click="removeUser(user._id)" class="flex-auto x">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </li>
        </ul>
        <button type="submit" class="w-full p-3 bg-mcc-blue text-white font-medium flex justify-center items-center rounded">Submit</button>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import getPaginatedData from "@/composables/getPaginatedData";
import useSendRequest from '@/composables/useSendRequest';
import { isASubSet } from "@/helpers/compare";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const openToEditPosition = ref(false);
const toggleAllowedHolders = ref(false);
const currentPage = ref(1);
const searchTerm = ref("");
const selectedUsers = ref([]);
const userCheckBoxes = ref([]);
const primeCheckBox = ref(null);
const updatePositionFormData = ref({});

// composables
const { data: users, paginated_res, error: getUsersError, load: getUsers, isPending: loading } = getPaginatedData("/users", currentPage);
const { isPending: updating, error: updatingError, updateDocument } = useSendRequest();

// computed
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    let fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});
const position = computed(() => {
  return store.getters.formattedConfig?.positions.find((position) => position._id === route.params.id);
});

const primeClicked = (event) => {
  if (event.target.checked) {
    userCheckBoxes.value.forEach((checkBox) => {
      checkBox.checked = true;
      let matchingUser = filteredUsers.value.find(user => user._id === checkBox.id)
      // only push of matching user is not in selectedUsers
      if(selectedUsers.value.findIndex(user => user._id === matchingUser._id) === -1){
        selectedUsers.value.push(matchingUser);
      }
    });
  } else {
    userCheckBoxes.value.forEach((checkBox) => {
      checkBox.checked = false;
      selectedUsers.value.splice(selectedUsers.value.findIndex(user => user._id === checkBox.id), 1);
    });
  }
};

const selectUser = (event, id) => {
  let checkedUser = filteredUsers.value.find((user) => user._id === id);
  if (event.target.checked) {
    selectedUsers.value.push(checkedUser);
  } else {
    selectedUsers.value.splice(selectedUsers.value.indexOf(checkedUser), 1);
  }

  if (isASubSet(selectedUsers.value, filteredUsers.value)) {
    primeCheckBox.value.checked = true;
  } else {
    primeCheckBox.value.checked = false;
  }
};

const removeUser = (id) => {
  let user = selectedUsers.value.find((user) => user._id === id);
  selectedUsers.value.splice(selectedUsers.value.indexOf(user), 1);
  userCheckBoxes.value.forEach((check) => {
    if (check.id === id) {
      check.checked = false;
    }
  });
  primeCheckBox.value.checked = false;
};

const onPageChange = async (page) => {
  currentPage.value = page;
  await getUsers();
  if (getUsersError.value) {
    toast.error(`${err.response.data.data.error}`);
  }

  // handle stuff for checkboxes: primeCheck
  if (isASubSet(selectedUsers.value, filteredUsers.value)) {
    primeCheckBox.value.checked = true;
  } else {
    primeCheckBox.value.checked = false;
  }

  // make sure the selected remains selected for each page
  selectedUsers.value.forEach(selectedUser => {
    filteredUsers.value.forEach(user => {
      if(selectedUser._id === user._id){
        let scopedCheckBox = userCheckBoxes.value.find(checkBox => checkBox.id === selectedUser._id);
        scopedCheckBox.checked = true
      }
    })
  })
  
};

// handling duties
const editablePosition = ref({ 
  ...position.value,
  duties: position.value.duties.map((duty, index) => { return {id: `duty_${index + 1}`, value: duty} })
});
const dutiesInputCount = ref(editablePosition.value.duties.length)
const addDutyInput = () => {
  // if length of what is show is less than what is available
  if(editablePosition.value.duties.length < position.value.duties.length){
    editablePosition.value.duties = position.value.duties.map((duty, index) => { return {id: `duty_${index + 1}`, value: duty} })
  }else{
    // else just add an empty one
    dutiesInputCount.value++;
    editablePosition.value.duties.push(`duty_${dutiesInputCount.value}`);
  }
}
const removeDutyInput = (index) => {
  if(editablePosition.value.duties.length > 1 && index !== 0){
    editablePosition.value.duties.splice(index, 1);
    dutiesInputCount.value = editablePosition.value.duties.length;
  }
}

const editPosition = async (position_id) => {
  let selectedUsersIds = selectedUsers.value.map(user => user._id)
  let formOutput = { ...updatePositionFormData.value, holders: selectedUsersIds }
  
  await updateDocument(`/edit-position/${route.params.id}`, formOutput);
  if(!updatingError.value){
    router.go();
  }
}

onMounted(async () => {
  await getUsers();
  if (getUsersError.value) {
    // do something later on. Toast is ini the composable
  }
});
</script>

<style>
ol.duties_list {
  counter-reset: list-counter;
}
ol.duties_list li {
  counter-increment: list-counter;
}
ol.duties_list li::before {
  @apply content-[counter(list-counter)] bg-mcc-dark-blue text-xs mr-2 text-white leading-none font-medium inline-grid place-items-center w-4 aspect-square ring-1 ring-mcc-dark-blue rounded-full;
}
</style>