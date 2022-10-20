<template>
  <div class="border-t border-gray-200 p-4">
    <h3 class="-mx-2 -my-3 flow-root">
      <!-- Expand/collapse section button -->
      <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
        <span class="font-medium text-gray-900">Color</span>
        <span class="ml-6 flex items-center">
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </h3>
    <!-- Filter section, show/hide based on section state. -->
    <div class="pt-6" id="filter-section-mobile-0">
      <div class="space-y-6">
        <div class="flex items-center">
          <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-gray-500">White</label>
        </div>
      </div>
    </div>
  </div>

  <!-- filter slideIn -->
  <!-- use this to import an mount in target page -->
    <!-- <teleport to="body">
      <div
        class="filter-slide h-full fixed z-spinner w-full top-0 overflow-x-hidden duration-500 flex justify-end"
        :class="[slideFilter ? 'right-0' : '-right-full']"
        @click.self="toggleSlideFilter()"
      >
        <div class="w-56 content p-4 bg-white h-full flex flex-col flex-wrap space-y-6">
          <h3 class="text-base font-bold tracking-tight text-gray-900">Filters</h3>
          <FilterSlideIn />
        </div>
      </div>
      <transition name="backdrop">
        <div v-if="slideFilter" class="backdrop bg-[rgba(0,0,0,0.5)] fixed w-full h-full top-0 z-modal"></div>
      </transition>
    </teleport> -->

<!-- <div class="filters-drop h-full dropdown relative" ref="filtersDropRoot">
                <button @click="toggleSlideFilter()" type="button" class="w-auto text-white font-medium text-sm text-center py-2 px-3 bg-mcc-blue rounded justify-center items-center inline-flex">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                </button>
              </div> -->
</template>

<script setup>
  const props = defineProps({
    filters: {
      type: Array,
      required: true
    }
  })
</script>

<style></style>
