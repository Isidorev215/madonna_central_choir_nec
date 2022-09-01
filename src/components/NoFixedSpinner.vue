<template>
  <div class="loading-splash z-spinner opacity-50 overflow-y-auto w-full h-full bg-gray-100 flex justify-center items-center">
    <span class="loading-button" type="button">
    <span class="inner"></span>
    <!-- loading... -->
  </span>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>

.loading-button {
  color: black;
  text-align: center;
  vertical-align: middle;
  padding: 15px 18px;
  line-height: 1.2em;
  font-weight: 500;
  box-shadow: none !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s all;
  text-decoration: none !important;
  border-radius: 10px;
  border-width: 2px;
  background: black;

  span.inner {
    width: 1rem;
    height: 1rem;
    border-width: 0.2em;
    display: inline-block;
    vertical-align: text-bottom;
    border: 2px solid white;
    border-right-color: transparent;
    border-radius: 50%;
    animation: 0.75s linear infinite spinner-inner;
  }
  @keyframes spinner-inner {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
