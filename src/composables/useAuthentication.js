import axios from "axios";
import { ref } from "vue";
import useToastForApi from './useToastForApi';


export default function useAuthentication(){
  const error = ref(null);
  const isPending = ref(false);

  const login = async (payload) => {

    isPending.value = true;
    error.value = null;
    try {
      const res = await axios.post('login', payload)
      isPending.value = false;
      error.value = null;
      useToastForApi(res, 'success');
  
      return res;
    }catch(err){
      isPending.value = false;
      error.value = err;
      useToastForApi(err, 'error');
    }
  }

  const register = async (payload) => {

    isPending.value = true;
    error.value = null;
    try {
      const res = await axios.post('register', payload)
      isPending.value = false;
      error.value = null;
      useToastForApi(res, 'success');

      return res;
    }catch(err){
      isPending.value = false;
      error.value = err;
      useToastForApi(err, 'error');
    }
  }

  return{ error, isPending, login, register }
}
