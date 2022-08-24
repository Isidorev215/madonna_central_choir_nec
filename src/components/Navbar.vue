<template>
  <div 
    class="top-menu lg:ml-56 h-16 fixed top-0 right-0 left-0 z-navbar flex items-center justify-between px-3 lg:bg-white text-white lg:text-black"
    :class="[slide_open ? 'bg-mcc-dark-blue' : 'bg-mcc-blue']"
  >

    <div class="icon-and-title flex justify-start items-center">
      <div class="icon-wrapper flex px-1 py-2 justify-center items-center cursor-pointer lg:hidden" @click="openSideNav">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </div>
      <span class="font-semibold text-sm md:text-base lg:text-xl">Isidore? change</span>
    </div>

    <div class="icons flex justify-end items-center space-x-5">

      <div class="notifications-drop h-full cursor-pointer relative">
        <button @click="showNotifDrop" class="flex justify-center items-center lg:p-1 lg:ring-1 ring-dark-gray-2 rounded-full">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span class="badge">*</span>
        </button>
        <div :class="{'hidden': notifDrop === false, 'block': notifDrop === true }" class="absolute -right-4 z-modal mt-3 bg-white divide-y divide-gray-100 rounded shadow w-80">
          <Notifications :notifications="notifications"/>
        </div>
      </div>

      <div class="profile-drop h-full dropdown relative">
        <button @click="showProfileDrop" data-dropdown-toggle="dropdown" class="text-black relative font-medium lg:py-2 lg:px-3 lg:ring-1 ring-dark-gray-2 rounded-md text-sm text-center inline-flex items-center" type="button">
          <!-- <img v-if="user && user.profile_image" class="w-10 h-10 rounded-[10px] align-middle" :src="user.profile_image"> -->
          <AvatarInitial name="Isidore? ?" :dimension="30" :rounded="9999" class="w-14 h-auto align-middle" />
          <span class="hidden lg:flex justify-center items-center font-medium text-base ml-2">Isidore? change</span>
          <svg class="w-4 h-4 ml-2 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div :class="{'hidden': profileDrop === false, 'block': profileDrop === true }" class="absolute right-0 z-modal mt-3 bg-white divide-y divide-gray-100 rounded shadow w-44 ">
          <ProfileDrop @logout="logout"/>
        </div>
      </div>
    </div>

  </div>

  <nav
    class="sidenav-slide lg:hidden h-full fixed z-navbar w-full top-0 overflow-x-hidden duration-500"
    :class="[slide_open ? 'left-0' : '-left-full']"
    @click.self="closeSideNav"
  >
    <SidebarLinks class="w-56" />
  </nav>
  <transition name="backdrop">
    <div v-if="slide_open" class="backdrop bg-[rgba(0,0,0,0.5)] lg:hidden fixed w-full h-full top-0 z-popUp"></div>
  </transition>

  <nav class="sidebar-fixed hidden lg:block h-full fixed z-navbar w-56 top-0 overflow-x-hidden">
    <SidebarLinks class="w-full" />
  </nav>

</template>

<script>
import AvatarInitial from '@/components/AvatarInitial.vue'
import Notifications from '@/components/Notifications.vue'
import ProfileDrop from '@/components/ProfileDrop.vue'
import SidebarLinks from '@/components/SidebarLinks.vue'
export default {
  props: ['pageConfig'],
  components: { AvatarInitial, Notifications, ProfileDrop, SidebarLinks },
  name: 'NavBar',
  data () {
    return {
      slide_open: false,
      profileDrop: false,
      notifDrop: false,
      notifications: [
        { type: 'CALL', subject: 'Annonvement', message: 'A new annoucement is happening', action: '393939', formatted_created_at: '16th June'},
        { type: 'NOT CALL', subject: 'Annonvement', message: 'A new annoucement is happening', action: '393939', formatted_created_at: '16th June'},
        { type: 'CALL', subject: 'Annonvement', message: 'A new annoucement is happening', action: '393939', formatted_created_at: '16th June'},
        { type: 'CALL is', subject: 'Annonvement', message: 'A new annoucement is happening', action: '393939', formatted_created_at: '16th June'},
        { type: 'CALL', subject: 'Annonvement', message: 'A new annoucement is happening', action: '393939', formatted_created_at: '16th June'},
      ],
    }
  },
  methods: {
    openSideNav () {
      this.slide_open = true
    },
    closeSideNav () {
      this.slide_open = false
    },
    showProfileDrop(){
      this.profileDrop = !this.profileDrop
      this.notifDrop = false;
    },
    showNotifDrop(){
      this.notifDrop = !this.notifDrop
      this.profileDrop = false;
    },
    logout(){
      // logout user
      console.log('Logout')
    }
  },
  watch: {
    $route() {
      this.closeSideNav()
      this.profileDrop = false
      this.notifDrop = false
    }
  },
}
</script>

<style>
nav a{
  @apply font-normal px-3 py-1
}
/* nav a.router-link-exact-active{ */
nav a.router-link-active{
  @apply border-r-4 border-white
}

/* nav {
  a {
    font-weight: 450;

    &.router-link-exact-active {
      border-left: 4px solid #191B30;

      .link-inner{
        // text-decoration: underline;
        @apply bg-gray-200 rounded-lg
      }
    }
  }
} */

.badge{
  @apply min-w-[16px] h-4 text-[10px] px-1 absolute right-[50%] translate-x-[120%] bg-white lg:bg-mcc-blue text-mcc-blue lg:text-white -top-1 inline-flex lg:hidden items-center justify-center font-normal text-center whitespace-nowrap align-baseline rounded-full;
}
.backdrop-enter-from,
.backdrop-leave-to{
  opacity: 0;
}

.backdrop-enter-to,
.backdrop-leave-from{
  opacity: 100;
}

.backdrop-enter-active,
.backdrop-leave-active{
  transition: opacity 0.8s ease-in-out;
}
</style>