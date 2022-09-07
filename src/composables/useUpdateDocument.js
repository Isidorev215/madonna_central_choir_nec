import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default function useUpdateDocument() {
  const toast = useToast();
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(false);

  const updateDocument = async (url, payload) => {
    isPending.value = true;
    data.value = null;
    error.value = null;

    try {
     let res = await axios.put(url, payload)
     error.value = null;
     isPending.value = false;
     toast.success(res.data.data.message)

     return res;
    //  return the res if it is needed
    }catch (err){
      error.value = err;
      isPending.value = false;
      toast.error(`${err.response.data.data.error}`);
      if(err.response.data.data.details.length > 0){
        toast.error(`${err.response.data.data.details[0]}`);
      }
    }
  }

  return {
    data,
    error,
    isPending,
    updateDocument
  }
}