<template>
  <div @click.self="$emit('closeModal')" class="fixed z-spinner overflow-auto top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
    <FormKit 
      type="form" 
      form-class="$reset content max-w-full w-[90%] grid grid-cols-3 gap-3" 
      :actions="false" 
      :incomplete-message="false" 
      :config="{ validationVisibility: 'submit' }"
      @submit="submitUsers"
    >
      
      <div class="left col-span-3 md:col-span-2 flex flex-col justify-start items-start space-y-3">
        <div class="select-users w-full grid grid-cols-1 gap-5 md:gap-8 p-3 md:p-5 bg-white rounded shadow-s1">
          <div class="heading flex justify-between items-center">
            <h2 class="text-lg leading-tight">Select User(s) for this Position</h2>
            <div class="w-5/12 input-wrapper h-10 pl-2 border border-gray-400 rounded-md hidden md:flex justify-center items-center space-x-2 bg-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input class="w-full h-full px-2 focus:outline-none" type="search" placeholder="Search by Name" v-model="searchTerm" />
            </div>
            <div @click="$emit('closeModal')" class="block md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
          </div>
          <div class="users-list">
            <div class="flex flex-col justify-start items-start space-y-4">
              <div class="prime-check flex justify-start items-center space-x-3 lg:space-x-6">
                <input class="flex-none h-4 md:h-5 w-4 md:w-5 accent-normal-green" type="checkbox" name="primeCheckBox" id="primeCheckBox" ref="primeCheckBox" @click="primeClicked($event)" />
                <label class="text-lg" for="primeCheckBox">Select All</label>
              </div>

              <ul class="w-full flex flex-col justify-start items-start space-y-3 md:space-y-4 max-h-[400px] overflow-y-auto">
                <li class="flex justify-start items-center space-x-3 md:space-x-5" v-for="user in filteredUsers" :key="user._id">
                  <input class="flex-none h-4 md:h-5 w-4 md:w-5 accent-normal-green" type="checkbox" ref="userCheckBoxes" :id="user._id" @click="selectUser($event, user._id)" />
                  <label class="flex-auto w-[200px] md:w-[250px] flex justify-start items-center space-x-2" :for="user._id">
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
              <button type="submit" class="w-full p-3 bg-mcc-blue text-white font-medium flex md:hidden justify-center items-center rounded-md">Submit ({{ selectedUsers.length }} selected users)</button>
            </div>
          </div>
        </div>
      </div>
      <div class="right col-span-1 hidden md:flex flex-col justify-start items-start space-y-3 h-full bg-white px-4 py-5 border-l rounded border-dark-gray-2">
        <h2 class="font-semibold text-xl">Selected Users ({{ selectedUsers.length }})</h2>
        <ul class="w-full flex flex-col justify-start items-start space-y-4 h-full max-h-[500px] overflow-y-auto">
          <li class="w-full flex justify-between items-center space-x-6" v-for="user in selectedUsers" :key="user._id">
            <div class="flex-auto w-[250px] flex justify-start items-start space-x-2">
              <AvatarInitial :name="`${user.firstName} ${user.lastName}`" :dimension="35" :rounded="9999" class="w-14 h-auto align-middle" />
              <div class="desc flex flex-col justify-center items-start">
                <strong class="text-base font-normal">{{ user.firstName }} {{ user.lastName }}</strong>
              </div>
            </div>
            <button type="button" @click="removeUser(user._id)" class="flex-auto flex justify-end">
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
import { ref, computed, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
  
  const router = useRouter();
  const store = useStore();
  const props = defineProps({
    position_id: { type: String, required: true }
  })
  const emit = defineEmits(['closeModal']);
  
  const currentPage = ref(1);
  const searchTerm = ref("");
  const selectedUsers = ref([]);
  const userCheckBoxes = ref([]);
  const primeCheckBox = ref(null);

  // computed
  const filteredUsers = computed(() => {
    let leanUsers = users.value.map(user => { 
      return { 
        _id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        profileImage: user.profileImage,
        isRegularized: user.isRegularized,
        isApproved: user.isApproved
      } 
    })
    return leanUsers.filter((user) => {
      let fullName = `${user.firstName} ${user.lastName}`;
      return fullName.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
  });
  const position = computed(() => {
    return store.getters.formattedConfig?.positions.find((position) => position._id === props.position_id);
  });
  // composables
  const { data: users, paginated_res, error: getUsersError, load: getUsers, isPending: loading } = getPaginatedData("/users", currentPage);
  const { isPending: updating, error: updatingError, updateDocument: updateHolders } = useSendRequest();

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

    // make sure the selected remains selected and checked for each page
    selectedUsers.value.forEach(selectedUser => {
      filteredUsers.value.forEach(user => {
        if(selectedUser._id === user._id){
          let scopedCheckBox = userCheckBoxes.value.find(checkBox => checkBox.id === selectedUser._id);
          scopedCheckBox.checked = true
        }
      })
    })
    
  };
  const submitUsers = async () => {
    // convert array to set
    let selectedUsersIds = new Set(selectedUsers.value.map(user => user._id))
    let requestPayload = { holders: [...selectedUsersIds] }; 
    await updateHolders(`/edit-position-holders/${props.position_id}`, requestPayload)
    if(!updatingError.value){
      router.go();
    }
  }

  onMounted(async() => {
    await getUsers();
    if (!getUsersError.value) {
      // check to make sure the holders are auto selected
      selectedUsers.value = [...position.value.holders]
    }
  })
</script>

<style>

</style>