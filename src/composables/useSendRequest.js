import axios from 'axios';
import { ref } from 'vue';
import useToastForApi from './useToastForApi';

export default function useSendRequest() {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(false);

  const updateDocument = async (url, payload) => {
    isPending.value = true;
    data.value = null;
    error.value = null;

    try {
     let res = await axios.put(url, payload)
     data.value = res.data;
     error.value = null;
     isPending.value = false;
     useToastForApi(res, 'success');
      
     return res;
    //  return the res if it is needed
    }catch (err){
      error.value = err;
      isPending.value = false;
      useToastForApi(err, 'error');
    }
  }

  const addDocument = async (url, payload) => {
    isPending.value = true;
    data.value = null;
    error.value = null;

    try {
     let res = await axios.post(url, payload)
     data.value = res.data;
     error.value = null;
     isPending.value = false;
     useToastForApi(res, 'success');
      
     return res;
    //  return the res if it is needed
    }catch (err){
      error.value = err;
      isPending.value = false;
      useToastForApi(err, 'error');
    }
  }

  return {
    data,
    error,
    isPending,
    updateDocument,
    addDocument,
  }
}