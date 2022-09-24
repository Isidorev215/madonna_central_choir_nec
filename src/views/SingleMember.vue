<template>
  <div class="flex flex-wrap flex-row">
    <Spinner v-if="gettingUser" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import getDataObject from '@/composables/getDataObject';
import { onMounted } from "@vue/runtime-core";

  const route = useRoute();
  const user_id = route.params.id;

  const { isPending: gettingUser, error: getUserError, data: user, load: getUser } = getDataObject(`/user/${user_id}`);
  getUser();


</script>

<style>

</style>