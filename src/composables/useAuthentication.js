import axios from "axios";
import { ref } from "vue";
import { useToast } from "vue-toastification";


export default function useAuthentication(){
  const error = ref(null);
  const isPending = ref(false);

  const login = async (payload) => {
    const toast = useToast();

    isPending.value = true;
    error.value = null;
    try {
      const res = await axios.post('login', payload)
      isPending.value = false;
      error.value = null;
      toast.success(res.data.data.message)
  
      return res;
    }catch(err){
      isPending.value = false;
      error.value = err;
      toast.error(`${err.response.data.data.error}`);
      if(err.response.data.data.details.length > 0){
        toast.error(`${err.response.data.data.details[0]}`);
      }
    }
  }

  const register = async (payload) => {
    const toast = useToast();

    isPending.value = true;
    error.value = null;
    try {
      const res = await axios.post('register', payload)
      isPending.value = false;
      error.value = null;
      toast.success(res.data.data.message)

      return res;
    }catch(err){
      isPending.value = false;
      error.value = err;
      toast.error(`${err.response.data.data.error}`);
      if(err.response.data.data.details.length > 0){
        toast.error(`${err.response.data.data.details[0]}`);
      }
    }
  }

  return{ error, isPending, login, register }
}
