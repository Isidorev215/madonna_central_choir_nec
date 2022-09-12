<template>
  <ul class="w-full py-4 pagination list-none flex justify-end items-center space-x-2 lg:space-x-4">
    <!-- <li class="pagination-item inline-block">
      <button class="pag-btn" type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
        First
      </button>
    </li> -->
    <li class="pagination-item inline-block">
      <button class="pag-btn" type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        <!-- <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> -->
        <span>Previous</span>
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li class="pagination-item inline-block" v-for="page in pages" :key="page.name">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }">{{page.name}}</button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item inline-block">
      <button class="pag-btn" type="button" @click="onClickNextPage" :disabled="isInLastPage">
        <span>Next</span>
        <!-- <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> -->
      </button>
    </li>
    <!-- <li class="pagination-item inline-block">
      <button class="pag-btn" type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
      </button>
    </li> -->
  </ul>
</template>

<script>
export default {
  emits: ['pagechanged'],
  props: {
    maxVisibleButtons: { required: false, default: 3,},
    total: { required: true,},
    perPage: { required: true,},
    currentPage: { required: true,},
  },
  computed: {
    totalPages(){
      if(this.total < this.perPage){
        return 1;
      }else{
        return Math.ceil(this.total / this.perPage)
      }
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return Math.abs(this.totalPages - this.maxVisibleButtons);
      }
      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages); i++) {
        range.push({ name: i, isDisabled: i === this.currentPage});
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>

<style scoped>
.active {
  @apply bg-mcc-blue text-white px-2 py-1;
}
.pag-btn{
  @apply flex items-center justify-center space-x-3 border border-gray-400 rounded-md bg-white py-2 px-3 text-mcc-dark-blue disabled:text-gray-300;
}
</style>
