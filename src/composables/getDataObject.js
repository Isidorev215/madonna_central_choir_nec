import axios from "axios";
import { ref } from "vue";
import useToastForApi from './useToastForApi';

const getDataObject = (url) => {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(false);
  
  const load = async () => {

    isPending.value = true;
    try {
      let res = await axios.get(url)
      if(!res.data.status){
        throw Error('No Data Available');
      }
      data.value = res.data.data;
      error.value = null;
      isPending.value = false;
    }catch(err) {
      error.value = err;
      isPending.value = false;
      useToastForApi(err, 'error');
    }
  }

  return { data, error, isPending, load }
}

export default getDataObject;
