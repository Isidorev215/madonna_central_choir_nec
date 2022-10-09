import { unref } from "vue"
import { useToast } from "vue-toastification";

const useToastForApi = (result, type) => {
  const payload = unref(result);
  const toast = useToast();

  if(type === 'success'){
    toast.success(payload.data.data.message)
  }
  else if(type === 'error'){
    toast.error(`${payload.response.data.data.error}`);
    if(payload.response.data.data.details.length > 0){
      toast.error(`${payload.response.data.data.details[0]}`);
    }
  }
}

export default useToastForApi;