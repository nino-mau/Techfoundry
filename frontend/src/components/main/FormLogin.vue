<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// librairies
import { z } from 'zod';
import { Form } from '@primevue/forms';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { zodResolver } from '@primevue/forms/resolvers/zod';

// icons
import { LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline';
// import IconLock from '@/components/icons/IconLock.vue';
// import IconCircleUserProfile from '@/components/icons/IconCircleUserProfile.vue';

// primevue
import Button from 'primevue/button';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';

//***===== Setup =====***//

const route = useRouter();

//***===== State =====***//

const serverError = ref(null);
const staySignedInValue = ref(); // Store bool of the stay signed in checkbox

// Handle Form-Validation

// Define initial values for form input
const initialValues = ref({
   username: '',
   password: '',
});

// Verify if string inputs are valid
const resolver = zodResolver(
   z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      password: z.string().min(1, { message: 'Password is required.' }),
   }),
);

// Handle Submit Actions
const onFormSubmit = async (e) => {
   if (e.valid) {
      try {
         if (staySignedInValue.value === undefined) {
            staySignedInValue.value = false;
         }

         const data = {
            username: e.values.username,
            password: e.values.password,
            staySignedIn: staySignedInValue.value,
         };
         const result = await postData('https://gameverse.local/api/auth/login', data);

         // Handle failure and success
         if (result.status === 200) {
            // Set login status to true in pinia store
            userStore.isUserLoggedIn = true;

            // Redirect user to profile page
            router.push('/');

            console.log('LOGIN: ', result.message);
         } else if (result.status === 401) {
            serverError.value = result.error;
            console.error('LOGIN: ', result.error);
         } else {
            console.error('LOGIN: ', result.error);
            toast('Unexpected error', {
               theme: 'colored',
               type: 'error',
               autoClose: 3000,
            });
         }
      } catch (error) {
         console.error('Unexpected error loging in user:', error);
         toast('Unexpected error', {
            theme: 'colored',
            type: 'error',
            autoClose: 3000,
         });
      }
   }
};
</script>

<template>
   <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex w-[35%] flex-col items-start justify-center rounded-md bg-white pt-12 pr-13 pb-6 pl-13 shadow-xl"
   >
      <h1 class="text-primary mb-[33px] text-3xl font-bold">Login</h1>
      <FloatLabel variant="on" class="input-wrapper">
         <IconField>
            <InputIcon>
               <UserIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <InputText
               name="username"
               id="login-username-input"
               :class="{ 'p-invalid': serverError }"
               type="text"
               autocomplete="off"
               fluid
            />
            <label for="login-username-input">Username</label>
         </IconField>
         <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ $form.username.error.message }}</Message
         >
         <Message
            v-if="serverError"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ serverError }}</Message
         >
      </FloatLabel>
      <FloatLabel variant="on">
         <IconField>
            <InputIcon class="z-10">
               <LockClosedIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <Password
               name="password"
               id="login-password-input"
               :feedback="true"
               autocomplete="off"
               :inputClass="`password-input-custom-spacing w-full ${serverError ? 'p-invalid' : ''}`"
               toggleMask
               fluid
            >
            </Password>
            <label for="login-password-input">Password</label>
         </IconField>
         <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid text-[15px]"
            >{{ $form.password.error.message }}</Message
         >
      </FloatLabel>
      <div class="mt-4 inline-flex items-center">
         <Checkbox
            name="staySignedIn"
            inputId="stay-signed-in-checkbox"
            :binary="true"
            v-model="staySignedInValue"
         />
         <label for="stay-signed-in-checkbox" class="pl-2 font-semibold text-[#64748b]"
            >Stay signed in
         </label>
      </div>
      <Button type="submit" label="Sign-in" class="mt-9 w-full" raised />
      <p class="mt-2 text-[#64748b]">
         Don't have an account ?
         <span class="text-primary cursor-pointer font-semibold">Sign Up</span>
      </p>
   </Form>
</template>

<style scoped>
/* Custom styling for inputs */
:deep(.p-floatlabel),
:deep(.p-password) {
   width: 100% !important;
}

/* Custom styling for input icons */
:deep(.p-iconfield) {
   display: flex !important;
   flex-grow: auto !important;
   align-items: center !important;
}
:deep(.p-inputicon) {
   top: unset !important;
   margin-top: unset !important;
   left: 2.5% !important;
}

.input-wrapper {
   display: flex;
   flex-direction: column;
   min-height: 80px;
}

.p-password-input {
   border-color: var(--color-invalid) !important;
}
</style>
