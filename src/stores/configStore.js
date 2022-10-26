import { defineStore } from 'pinia'
import moment from 'moment'
import axios from 'axios'
import useToastForApi from '../composables/useToastForApi'

export const useConfigStore = defineStore('configStore', {
  state: () => ({
    config: null,
    isPending: false,
  }),
  getters: {
    user(){
      return {
        ...this.config.user,
        birthday: this.config?.user?.birthday ? moment(this.config?.user?.birthday).format('MMM Do YYYY') : null,
        regularizedAt: this.config?.user?.regularizedAt ? moment(this.config?.user?.regularizedAt).format('MMM Do YYYY') : null,
        graduatedAt: this.config?.user?.graduatedAt ? moment(this.config?.user?.graduatedAt).format('MMM Do YYYY') : null,
        approvedAt: this.config?.user?.approvedAt ? moment(this.config?.user?.approvedAt).format('MMM Do YYYY') : null,

      }
    }
  },
  actions: {
    async updateConfig(){
      this.isPending = true;
      try {
        const res = await axios.get('/config')
        this.config = res.data.data
        this.isPending = false;
      }catch(error) {
        this.config = null;
        this.isPending = false;
        useToastForApi(error, 'error')
      }
    }
  }
})
