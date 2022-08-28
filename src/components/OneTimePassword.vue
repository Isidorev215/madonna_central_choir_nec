<template>
  <input
    v-for="index in digits"
    :key="index"
    maxlength="1"
    :class="context.classes.digit"
    :value="tmp[index - 1] || ''"
    @input="handleInput(index - 1, $event)"
    @focus="handleFocus"
    @paste="handlePaste"
  />
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
  context: Object,
})

const digits = Number(props.context.digits)
const tmp = ref(props.context.value || '')

/**
 * Handle input, advancing or retreating focus.
 */
function handleInput(index, e) {
  const prev = tmp.value

  if (tmp.value.length <= index) {
    // If this is a new digit
    tmp.value = '' + tmp.value + e.target.value
  } else {
    // If this digit is in the middle somewhere, cut the string into two
    // pieces at the index, and insert our new digit in.
    tmp.value =
      '' +
      tmp.value.substr(0, index) +
      e.target.value +
      tmp.value.substr(index + 1)
  }

  // Get all the digit inputs
  const inputs = e.target.parentElement.querySelectorAll('input')

  if (index < digits - 1 && tmp.value.length >= prev.length) {
    // If this is a new input and not at the end, focus the next input
    inputs.item(index + 1).focus()
  } else if (index > 0 && tmp.value.length < prev.length) {
    // in this case we deleted a value, focus backwards
    inputs.item(index - 1).focus()
  }

  if (tmp.value.length === digits) {
    // If our input is complete, commit the value.
    props.context.node.input(tmp.value)
  } else if (tmp.value.length < digits && props.context.value !== '') {
    // If our input is incomplete, it should have no value.
    props.context.node.input('')
  }
}

/**
 * On focus, select the text in our input.
 */
function handleFocus(e) {
  e.target.select()
}

/**
 * Handle the paste event.
 */
function handlePaste(e) {
  const paste = e.clipboardData.getData('text')
  if (typeof paste === 'string') {
    // If it is the right length, paste it.
    tmp.value = paste.substr(0, digits)
    const inputs = e.target.parentElement.querySelectorAll('input')
    // Focus on the last character
    inputs.item(tmp.value.length - 1).focus()
  }
}

// This is the global registeration code
// import { createApp } from 'Vue'
// import App from 'App.vue'
// import OneTimePassword from './OneTimePassword.vue'
// import { plugin, defaultConfig, createInput } from '@formkit/vue'

// const app = createApp(App)
// app.use(
//   plugin,
//   defaultConfig({
//     inputs: {
//       otp: createInput(OneTimePassword, {
//         props: ['digits'],
//       }),
//     },
//   })
// )
// app.mount('#app')

// This is the mounting tag. digits will be the number of input fields as props
// <FormKit type="otp" digits="4" />

</script>

<style>
.formkit-digit{
  @apply px-3 w-10 h-10 rounded-md border-2 border-gray-300
}
</style>

