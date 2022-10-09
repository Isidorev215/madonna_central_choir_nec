import axios from "axios";
import { ref, unref } from "vue";
import useToastForApi from './useToastForApi';

const getPaginatedData = (url, page) => {
  const paginated_res = ref(null);
  const data = ref([]);
  const error = ref(null);
  const isPending = ref(false);
  
  const load = async () => {
    isPending.value = true;
    try {
      let res = await axios.get(`${url}?page=${unref(page)}`)
      if(!res.data.status){
        throw Error('No Data Available');
      }
      paginated_res.value = res.data.data;
      data.value = res.data.data.data;
      error.value = null;
      isPending.value = false;
    }catch(err) {
      error.value = err;
      isPending.value = false;
      useToastForApi(err, 'error');
    }
  }

  return { data, paginated_res, error, isPending, load }
}

export default getPaginatedData;
