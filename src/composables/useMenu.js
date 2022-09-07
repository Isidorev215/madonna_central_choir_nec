import { def } from "@vue/shared";
import { readonly, ref } from "vue";

const isOpen = ref(false);

const openMenu = () => {
  isOpen.value = true;
}
const closeMenu = () => {
  isOpen.value = false;
}

export default function useMenu(){
  return{
    isOpen: readonly(isOpen),
    openMenu,
    closeMenu
  }
}