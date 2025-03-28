// vue
import { useGlobalStore } from '../stores/globalStore';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // get api url

//***===== Functions =====***//

// Reusable function to call unprotected api endpoints
export async function callApi(
   endpoint,
   {
      data = null,
      method = 'GET',
      credentials = 'include',
      caller = '',
      headers = { 'Content-Type': 'application/json' },
      handleLoading = true,
   } = {},
) {
   const globalStore = useGlobalStore();

   if (handleLoading) {
      globalStore.isLoading = true;
   }

   globalStore.apiError = null; // Reset error state before new call

   const options = {
      method: method,
      credentials: credentials,
      headers: headers,
   };

   const url = apiUrl + endpoint;
   console.log(`[API] Calling ${method} ${url}`);

   if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
   }

   try {
      let response = await fetch(url, options);
      console.log(`[API] Response status: ${response.status}`);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      let parsedResponse;

      if (contentType && contentType.includes('application/json')) {
         parsedResponse = await response.json();
      } else {
         const text = await response.text();
         console.log(`[API] Received non-JSON response:`, text);
         parsedResponse = { data: text };
      }

      if (!response.ok) {
         console.error(
            `[API] ${caller}: Call to endpoint ${endpoint} failed with status: ${response.status}`,
         );
         const errorMsg = parsedResponse.error || parsedResponse.message || 'Unknown error';
         console.error(parsedResponse.error || parsedResponse.message || 'Unknown error');
         globalStore.apiError = errorMsg;
         return false;
      }

      return parsedResponse;
   } catch (err) {
      console.error(`[API] Call to endpoint ${endpoint} failed with error:`, err);
      globalStore.apiError = err.message;

      return { error: err.message, success: false };
   } finally {
      if (handleLoading) {
         globalStore.isLoading = false;
      }
   }
}
