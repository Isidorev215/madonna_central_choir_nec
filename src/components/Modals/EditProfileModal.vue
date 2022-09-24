<template>
  <!-- Modal -->
  <div tabindex="0" class="z-spinner overflow-auto inset-0 w-full h-full fixed py-6">
    <div class="z-spinner relative p-3 mx-auto my-0 max-w-full" style="max-width: 600px" x-transition:enter="transition duration-500" x-transition:enter-start="transform opacity-0 -translate-y-4" x-transition:enter-end="transform opacity-100 translate-y-0" x-transition:leave="transition -translate-y-4" x-transition:leave-start="transform opacity-100 translate-y-0" x-transition:leave-end="transform opacity-0 -translate-y-4">
      <FormKit 
        form-class="valid-form bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-800 flex flex-col overflow-hidden" 
        novalidate="true" 
        type="form" 
        :actions="false" 
        :incomplete-message="false" 
        :config="{ validationVisibility: 'submit' }" 
        :disabled="updating" 
        @submit="submitUpdate"
      >
        <!-- modal title -->
        <div class="w-full flex justify-between itsm-center px-6 py-3 text-xl border-b dark:border-gray-800 font-bold">
          <span>Edit profile</span>
          <button type="button" @click="$emit('closeModal')" class="fill-current h-6 w-6 font-3xl font-bold">×</button>
        </div>

        <!-- modal content -->
        <div class="p-6 flex-grow">
          <div class="flex flex-wrap flex-row -mx-4">
            <div class="flex-shrink max-w-full px-4 w-full">
              <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden pb-8">
                <div class="h-40 overflow-hidden relative">
                  <img :src="user?.coverImage ? user?.coverImage : require(`@/assets/img/default_profile_cover.jpg`)" class="w-full" />
                </div>
                <div class="flex justify-center -mt-10 relative">
                  <AvatarInitial :image="user.profileImage" :name="`${user.firstName} ${user.lastName}`" :dimension="96" :rounded="9999" class="rounded-full w-24 h-24 bg-gray-200 border-solid border-white border-2 -mt-3" />
                </div>
              </div>
            </div>
            <div class="form-group flex-shrink max-w-full px-4 w-full mb-6">
              <div class="inline-block mb-2">Avatar (80x80)</div>
              <FormKit 
                type="file" 
                id="avatar-upload" 
                name="profileImage"
                accept=".jpg, .jpeg, .png" 
                wrapper-class="$reset w-full flex justify-start items-center"
                inner-class="$reset relative flex items-center" 
                input-class="$reset hidden"
                noFiles-class="$reset hidden"
                fileList-class="$reset w-full flex justify-start items-center"
                fileName-class="$reset text-base"
                fileRemove-class="$reset text-base ml-3 text-transparent flex before:content-['x'] before:text-red-500"
              >
                <template #label="context">
                  <label :for="context.id" class="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto text-gray-500 inline-block w-6 h-6 bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"></path>
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                    </svg>
                    Browse file
                  </label>
                </template>
              </FormKit>
            </div>
            <div class="form-group flex-shrink max-w-full px-4 w-full mb-6">
              <div class="inline-block mb-2">Cover (1287x160)</div>
              <FormKit 
                type="file" 
                id="cover-upload" 
                name="coverImage"
                accept=".jpg, .jpeg, .png" 
                wrapper-class="$reset w-full flex justify-start items-center"
                inner-class="$reset relative flex items-center" 
                input-class="$reset hidden"
                noFiles-class="$reset hidden"
                fileList-class="$reset w-full flex justify-start items-center"
                fileName-class="$reset text-base"
                fileRemove-class="$reset text-base ml-3 text-transparent flex before:content-['x'] before:text-red-500"
              >
                <template #label="context">
                  <label :for="context.id" class="py-1.5 px-3 inline-block text-center rounded leading-normal text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2 dark:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mx-auto text-gray-500 inline-block w-6 h-6 bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"></path>
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"></path>
                    </svg>
                    Browse file
                  </label>
                </template>
              </FormKit>
            </div>
            <FormKit 
              type="text"
              label="first Name"
              name="firstName"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="text"
              label="last Name"
              name="lastName"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="text"
              label="occupation"
              name="occupation"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="text"
              label="state"
              name="state"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="text"
              label="country"
              name="country"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <div class="w-full border-t border-gray-200 my-3 dark:border-gray-700"></div>
            <FormKit 
              type="select"
              label="marital status"
              name="maritalStatus"
              :options="[
                { label: 'Marital Status', value: undefined },
                { label: 'Married', value: 'Married' },
                { label: 'Single', value: 'Single' },
                { label: 'Clergy', value: 'Clergy' },
              ]"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="select"
              label="campus"
              name="campus"
              :options="[
                { label: 'Campus', value: undefined },
                { label: 'Elele', value: 'Elele' },
                { label: 'Akpugo', value: 'Akpugo' },
                { label: 'Okija', value: 'Okija' },
              ]"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="select"
              label="choir part"
              name="choirPart"
              :options="[
                { label: 'Choir Part', value: undefined },
                { label: 'Soprano', value: 'Soprano' },
                { label: 'Alto', value: 'Alto' },
                { label: 'Tenor', value: 'Tenor' },
                { label: 'Bass', value: 'Bass' },
              ]"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="text"
              label="chapter"
              name="chapter"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
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
                :value="user?.church?.churchName"
                outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
                wrapper-class="$reset w-full flex flex-col justify-start"
                label-class="$reset block mb-1 text-base capitalize"
                validation-visibility="blur"
              />
              <FormKit 
                type="text"
                label="Denomination"
                name="denomination"
                :value="user?.church?.denomination"
                outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
                wrapper-class="$reset w-full flex flex-col justify-start"
                label-class="$reset block mb-1 text-base capitalize"
                validation-visibility="blur"
              />
              <FormKit 
                type="text"
                label="State (Church)"
                name="state"
                :value="user?.church?.state"
                outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
                wrapper-class="$reset w-full flex flex-col justify-start"
                label-class="$reset block mb-1 text-base capitalize"
                validation-visibility="blur"
              />
              <FormKit 
                type="text"
                label="Country (Church)"
                name="country"
                :value="user?.church?.country"
                outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
                wrapper-class="$reset w-full flex flex-col justify-start"
                label-class="$reset block mb-1 text-base capitalize"
                validation-visibility="blur"
              />
            </FormKit>

            <div class="w-full border-t border-gray-200 my-3 dark:border-gray-700"></div>

            <FormKit 
              type="date"
              label="Birthday"
              name="birthday"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
            <FormKit 
              type="date"
              label="Graduation Date"
              name="graduatedAt"
              outer-class="$reset form-group flex-shrink max-w-full px-4 w-full md:w-1/2 mb-2"
              wrapper-class="$reset w-full flex flex-col justify-start"
              label-class="$reset block mb-1 text-base capitalize"
              validation-visibility="blur"
            />
          </div>
        </div>
        <div class="px-6 py-3 border-t dark:border-gray-800 flex justify-end space-x-2">
          <button @click="$emit('closeModal')" type="button" class="py-2 px-4 inline-block text-center rounded leading-5 text-gray-800 bg-gray-100 border border-gray-100 hover:text-gray-900 hover:bg-gray-200 hover:ring-0 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-200 focus:outline-none focus:ring-0 ltr:mr-2 rtl:ml-2">Close</button>
          <button type="submit" class="py-2 px-4 flex text-center rounded leading-5 text-gray-100 bg-indigo-500 border border-indigo-500 hover:text-white hover:bg-indigo-600 hover:ring-0 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-0">
            <svg v-if="updating" class="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="updating">Updating...</span>
            <span v-else>Update</span>
          </button>
        </div>
      </FormKit>
    </div>
    <div class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
  </div>
</template>

<script setup>
import useSendRequest from "@/composables/useSendRequest";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  user: { type: Object, required: true },
});

// composable
const { isPending: updating, error: updatingError, updateDocument } = useSendRequest();

const submitUpdate = async (formData) => {
  let profileImage = formData.profileImage.length > 0 ? formData.profileImage[0].file : undefined;
  let coverImage = formData.coverImage.length > 0 ? formData.coverImage[0].file : undefined;
  formData = {...formData, profileImage, coverImage}
  // The above is to formt and extract the images
  await updateDocument("/profile/update", formData);
  if (!updatingError.value) {
    emit('closeModal');
    router.go();
  }
};
</script>

<style>
.dropzone {
  @apply min-h-[150px] border-2 border-solid border-gray-300 bg-white p-5;
}
.dropzone.dz-clickable {
  @apply cursor-pointer;
}
.single-dropzone {
  @apply w-full border;
}
</style>