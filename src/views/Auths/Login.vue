<template>
  <div class="h-screen m-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="form-wrap col-span-1 md:col-span-2 px-4 md:px-8 py-10 flex justify-center items-center">
      <FormKit 
        form-class="w-full grid grid-cols-1 gap-1"
        type="form"
        :actions="false"
        :incomplete-message="false"
        :config="{ validationVisibility: 'submit' }"
        v-model="loginForm"
        @submit="submitLogin" 
      >
        <div class="image-wrapper mb-3">
          <img src="@/assets/img/logo.png" alt="Logo" class="w-28 h-28 rounded-full bg-mcc-light-gray">
        </div>
        <FormKit
          type="email"
          label="Email"
          name="email"
          outer-class="mb-2"
          wrapper-class="$reset w-full flex flex-col justify-start"
          label-class="$reset block mb-1 font-medium text-base"
          prefix-icon="email"
          validation="required|email"
          validation-visibility="blur"
        />
        <FormKit
          type="password"
          label="Password"
          name="password"
          outer-class="mb-2"
          wrapper-class="$reset w-full flex flex-col justify-start"
          label-class="$reset block mb-1 font-medium text-base"
          prefix-icon="password"
          suffix-icon="eyeClosed"
          validation="required"
          validation-visibility="blur"
          @suffix-icon-click="handleIconClick"
        />       
        <div class="Sub-links w-full flex justify-start items-center space-x-2 mb-2">
          <span>Dont have an account</span>
          <router-link class="text-mcc-red" to="/register" type="button">Register</router-link>
        </div>

        
        <div class="formkit-outer">
          <div class="wrapper w-full flex flex-col justify-start">
            <button v-if="loggingIn" class=" w-full p-4 bg-mcc-blue text-white font-medium text-center rounded-md flex justify-center items-center space-x-2" disabled>
              <svg class="animate-spin ml-2 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Logging In...</span>
            </button>
            <button type="submit" v-else class=" w-full p-4 bg-mcc-blue text-white font-medium text-center rounded-md">
              Login
            </button>
          </div>
        </div>

      </FormKit>
    </div> 
    <div class="bg-login-bg h-full hidden md:block bg-cover bg-no-repeat bg-center border-l-2 border-gray-200"></div>
</div>
</template>

<script setup>
import moment from 'moment';
import { reactive } from "@vue/reactivity";
import useAuthentication from '@/composables/useAuthentication';

  const loginForm = reactive({});

  // composables
  const { error: loginError, isPending: loggingIn, login } = useAuthentication();

  const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
  }

  const submitLogin = async () => {
    const res = await login(loginForm);
    if(!loginError.value){
      localStorage.setItem('token', res.data.data.token);
      localStorage.setItem('token_expires', moment(res.data.data.expires));
      window.location = '/';
    }
  }
</script>

<style>
.formkit-suffix-icon:hover {
  color: var(--fk-color-primary);
}
</style>