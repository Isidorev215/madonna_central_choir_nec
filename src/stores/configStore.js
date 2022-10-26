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
    formattedConfig(){
      return {
        ...this.config,
        birthday: this.config?.birthday ? moment(this.config?.birthday).format('MMMM Do YYYY') : null,
        regularizedAt: this.config?.regularizedAt ? moment(this.config?.regularizedAt).format('MMMM Do YYYY') : null,
        graduatedAt: this.config?.graduatedAt ? moment(this.config?.graduatedAt).format('MMMM Do YYYY') : null,
        approvedAt: this.config?.approvedAt ? moment(this.config?.approvedAt).format('MMMM Do YYYY') : null,

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
