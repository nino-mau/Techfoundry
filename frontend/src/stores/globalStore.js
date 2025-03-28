import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('app', {
   state: () => ({
      isLoading: false,
      apiError: null,
   }),
   actions: {
      setLoading(status) {
         this.isLoading = status;
         console.log('set loading to', status);
      },
      setError(error) {
         this.apiError = error;
      },
   },
});
