import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('app', {
   state: () => ({
      isLoading: false,
      apiError: null,
   }),
   actions: {
      setLoading(status) {
         this.isLoading = status;
      },
      setError(error) {
         this.apiError = error;
      },
   },
});
