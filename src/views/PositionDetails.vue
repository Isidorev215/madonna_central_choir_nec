<template>
  <div class="position-details">
    <section class="custom-divider md:px-4 mb-6 flex items-center justify-between">
      <button type="button" @click="$router.go(-1)" class="flex items-center justify-start">
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
      form-class="$reset grid grid-cols-1 gap-3" 
      :actions="false" 
      :incomplete-message="false" 
      v-model="updatePositionFormData" 
      :config="{ validationVisibility: 'submit' }"
      @submit="editPosition(position._id)"
    >
      <div class="left col-span-1 flex flex-col justify-start items-start space-y-3 md:px-4">
        <div class="w-full">
          <div class="bg-white rounded shadow-s1 p-3 lg:p-5">
            <h2 class="text-lg font-semibold mb-2 capitalize">{{ position.name }}</h2>
            <p class="mb-4">{{ position.desc }}</p>

            <div class="mb-2 w-full flex justify-between items-center">
              <h2 class="text-lg font-semibold">Holders</h2>
              <div class="text-xs md:text-sm flex justify-start items-stretch">
                <span class="rounded-l py-1 px-3 bg-gray-200">Maximum no. of Holders</span>
                <span class="content rounded-r px-3 py-1 text-white bg-green-400">{{ position.allowedHolders > 0 ? position.allowedHolders : 'Non'  }}</span>
              </div>
            </div>
            <ul v-if="position.holders.length > 0" class="current-holders-list">
              <li v-for="holder in position.holders" :key="holder._id" class="flex space-y-3 mb-2 last:mb-6">
                <div class="flex-auto w-[200px] lg:w-[250px] flex justify-start items-center space-x-2">
                  <AvatarInitial :image="holder.profileImage" :name="`${holder.firstName} ${holder.lastName}`" :dimension="35" :rounded="9999" class="w-14 h-auto align-middle" />
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

        <div class="form-fields w-full grid grid-cols-1 gap-3 lg:gap-8 p-3 lg:p-5 bg-white rounded shadow-s1">
          <div class="heading flex justify-between items-center">
            <h2 class="text-lg leading-tight">Edit Position</h2>
            <button type="button" class="px-3 py-2 bg-mcc-blue text-white font-medium flex justify-center items-center rounded" @click="openAddUsersModal">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              {{position.holders.length > 0 ? 'Change Holders' : 'Add Holders' }}
            </button>
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
              :value="isNaN(Number(position.allowedHolders)) ? '0' : position.allowedHolders"
              type="number"
              name="allowedHolders"
              label="Allowed Holders"
              help="Add the number of holders allowed for the position, Zero (0) represents no limit"
              min="0"
              step="1"
              outer-class="mb-2"
              wrapper-class="$reset w-2/3 flex flex-col justify-start"
              label-class="$reset block mb-1 font-medium text-base"
              validation="required|min:0"
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
          <button type="submit" class="w-full p-3 bg-mcc-blue text-white font-medium flex justify-center items-center rounded-md">Submit</button>
        </div>
      </div>
      
    </FormKit>

    <teleport to="body">
      <AddUsersToPositionModal v-if="isAddUsersModalOpen" :position_id="$route.params.id" @closeModal="closeAddUsersModal" />
    </teleport>
  </div>
</template>

<script setup>
import AddUsersToPositionModal from '@/components/Modals/AddUsersToPositionModal.vue';
import getPaginatedData from "@/composables/getPaginatedData";
import useSendRequest from '@/composables/useSendRequest';
import { computed, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useConfigStore } from '../stores/configStore';
import { useConfirmDialog } from '@vueuse/core'

const route = useRoute();
const router = useRouter();
const configStore = useConfigStore();

const openToEditPosition = ref(false);
const toggleAllowedHolders = ref(false);
const updatePositionFormData = ref({});

// composables
const { isPending: updating, error: updatingError, updateDocument } = useSendRequest();
const { reveal: openAddUsersModal, isRevealed: isAddUsersModalOpen, cancel: closeAddUsersModal } = useConfirmDialog();

const position = computed(() => {
  return configStore.formattedConfig?.positions.find((position) => position._id === route.params.id);
});

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
// form submission
const editPosition = async (position_id) => {
  await updateDocument(`/edit-position/${route.params.id}`, updatePositionFormData.value);
  if(!updatingError.value){
    router.go();
  }
}

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