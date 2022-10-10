<template>
  <div class="relative z-spinner" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div @click.self="$emit('closeModal')" class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="bg-white p-4 transform overflow-hidden rounded text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
          <FormKit
            type="form"
            form-class="w-full grid grid-cols-1 gap-1"
            :actions="false"
            :incomplete-message="false"
            :config="{ validationVisibility: 'submit' }"
            @submit="submitNewPosition"
          >

            <FormKit 
              type="text"
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
              help="Check to limit the holders of this position"
              :ignore="true"
              v-model="toggleAllowedHolders"
            />

            <FormKit 
              v-if="toggleAllowedHolders"
              type="number"
              name="allowedHolders"
              label="Allowed Holders"
              help="Add the number of holders allowed for the position, Zero(0) represents no limit"
              help_2=""
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
                v-for="(duty, index) in dutiesInputArray"
                :key="duty"
                :name="duty"
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

          <div class="button-wrapper">
            <button type="submit" class="flex items-center bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
              <svg v-if="creatingPosition" class="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="creatingPosition">Creating position...</span>
              <span v-else>Create</span>
            </button>
          </div>

          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "@vue/reactivity";
import useSendRequest from '@/composables/useSendRequest';
import { useRouter } from "vue-router";
  const router = useRouter();
  const emit = defineEmits(["closeModal"]);
  
  const toggleAllowedHolders = ref(false);
  const dutiesInputCount = ref(1)
  const dutiesInputArray = reactive([ `duty_${dutiesInputCount.value}` ]);
  const addDutyInput = () => {
    dutiesInputCount.value++;
    dutiesInputArray.push(`duty_${dutiesInputCount.value}`)
  }
  const removeDutyInput = (index) => {
    if(dutiesInputArray.length > 1 && index !== 0){
      dutiesInputArray.splice(index, 1)
      dutiesInputCount.value = dutiesInputArray.length;
    }
  }

  // composable
  const {isPending: creatingPosition, error: creatingPositionError, addDocument: createPosition } = useSendRequest();

  const submitNewPosition = async(formData) => {
    await createPosition('/create-position', formData)
    if(!creatingPositionError.value){
      emit('closeModal');
      router.go();
    }
  }

</script>

<style></style>
