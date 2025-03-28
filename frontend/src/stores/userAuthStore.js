import { defineStore } from 'pinia';
import { callApi } from '@/helpers/api';

export const useAuthStore = defineStore('userAuthStore', {
   state: () => ({
      isLoggedIn: false,
      username: null,
   }),
   actions: {
      async register(inputData) {
         const options = {
            data: inputData,
            method: 'POST',
            credentials: 'include',
            caller: 'register',
            headers: {
               'Content-Type': 'application/json',
               Accept: 'application/json',
            },
         };

         const r = await callApi('/api/user/register', options);

         if (!r.success) {
            this.isLoggedIn = false;
            return r;
         }

         this.isLoggedIn = true;
         return true;
      },
   },
});
