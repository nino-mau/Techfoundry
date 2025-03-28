<script setup>
// vue
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/userAuthStore';

// librairies
import { z } from 'zod';
import { Form } from '@primevue/forms';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { zodResolver } from '@primevue/forms/resolvers/zod';

// icons
import { LockClosedIcon, UserIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';

// primevue
import Button from 'primevue/button';
import Message from 'primevue/message';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import FloatLabel from 'primevue/floatlabel';

//***===== Setup =====***//

const router = useRouter();
const authStore = useAuthStore();

//***===== State =====***//

let serverError = ref(null);

const initialValues = ref({
   username: '',
   email: '',
   password: '',
   confirmPassword: '',
});

//***===== Functions =====***//

// Validate inputs
const resolver = zodResolver(
   z
      .object({
         username: z
            .string()
            .min(1, { message: 'Username is required.' })
            .min(3, { message: 'Username longer than 3 characters.' }),
         email: z.string().email({ message: 'Invalid email address' }),
         password: z
            .string()
            .min(1, { message: 'Password is required.' })
            .min(5, { message: 'Minimum 5 characters.' }),
         confirmPassword: z.string().min(1, { message: 'Confirm your password.' }),
      })
      .superRefine((val, ctx) => {
         if (val.password !== val.confirmPassword) {
            ctx.addIssue({
               code: 'custom',
               message: 'Password does not match.',
               path: ['confirmPassword'],
            });
         }
      }),
);

// Make the register request
const onRegisterSubmit = async (e) => {
   if (e.valid) {
      try {
         const data = {
            username: e.values.username,
            email: e.values.email,
            password: e.values.password,
         };

         const r = await authStore.register(data);

         console.log(r);

         if (!r.success) {
            _serverErrorHandler(r);
         } else {
            authStore.isLoggedIn = true;
            toast('Unexpected error', {
               theme: 'colored',
               type: 'error',
               autoClose: 3000,
            });
            router.push('/');
         }
      } catch (error) {
         console.error('Unexpected error registering in user:', error);
         toast('Unexpected error', {
            theme: 'colored',
            type: 'error',
            autoClose: 3000,
         });
      }
   }
};

// handle dealing with server error on register
function _serverErrorHandler(response) {
   const responseBody = response.response;
   switch (response.status) {
      case 409:
         serverError.value = 'Email already in use';
         console.error('Register Failed: ', responseBody.message);
         break;
      case 422:
         serverError.value = 'One of the field syntax is invalid';
         console.log(serverError.value);
         console.error('Register Failed: ', responseBody.message);
         break;
      case 500:
         serverError.value = 'Unexpected error';
         console.error('Register Failed: ', responseBody.message);
         break;
      default:
         serverError.value = 'Unexpected error';
         console.error('Register Failed: ', responseBody.message);
         break;
   }
}
</script>

<template>
   <!-- Register Form -->
   <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onRegisterSubmit"
      class="flex w-[35%] flex-col items-start justify-center rounded-md bg-white pt-12 pr-13 pb-6 pl-13 shadow-xl"
   >
      <!-- Title -->
      <h1 class="text-primary mb-[33px] text-3xl font-bold">Sign-up</h1>

      <!-- Username Input -->
      <FloatLabel variant="on" class="input-wrapper">
         <IconField>
            <InputIcon>
               <UserIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <InputText
               name="username"
               id="username-input"
               :class="{ 'p-invalid': serverError }"
               type="text"
               autocomplete="off"
               fluid
            />
            <label for="username-input">Username</label>
         </IconField>
         <!-- Syntax Error -->
         <Message
            v-if="$form.username?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ $form.username.error.message }}</Message
         >
         <!-- Server Error -->
         <Message
            v-if="serverError"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ serverError }}</Message
         >
      </FloatLabel>

      <!-- Email Input -->
      <FloatLabel variant="on" class="input-wrapper">
         <IconField>
            <InputIcon>
               <EnvelopeIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <InputText
               name="email"
               id="email-input"
               :class="{ 'p-invalid': serverError }"
               type="text"
               autocomplete="off"
               fluid
            />
            <label for="email-input">Email</label>
         </IconField>
         <!-- Syntax Error -->
         <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ $form.email.error.message }}</Message
         >
      </FloatLabel>

      <!-- Password Input -->
      <FloatLabel variant="on" class="input-wrapper">
         <IconField>
            <InputIcon class="z-10">
               <LockClosedIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <Password
               name="password"
               id="password-input"
               :feedback="true"
               autocomplete="off"
               :inputClass="`password-input-custom-spacing w-full ${serverError ? 'p-invalid' : ''}`"
               toggleMask
               fluid
            >
            </Password>
            <label for="password-input">Password</label>
         </IconField>
         <!-- Syntax Error -->
         <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid text-[15px]"
            >{{ $form.password.error.message }}</Message
         >
      </FloatLabel>

      <!-- Password Confirm Input -->
      <FloatLabel variant="on" class="input-wrapper">
         <IconField>
            <InputIcon class="z-10">
               <LockClosedIcon class="w-[25px] stroke-[1.8] text-[#94a3b8]" />
            </InputIcon>
            <Password
               name="confirmPassword"
               id="confirm-password-input"
               :feedback="true"
               autocomplete="off"
               :inputClass="`password-input-custom-spacing w-full ${serverError ? 'p-invalid' : ''}`"
               toggleMask
               fluid
            >
            </Password>
            <label for="confirm-password-input">Confirm Password</label>
         </IconField>
         <!-- Syntax Error -->
         <Message
            v-if="$form.confirmPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="text-invalid min-h-[10px] text-[15px]"
            >{{ $form.confirmPassword.error.message }}</Message
         >
      </FloatLabel>

      <Button type="submit" label="Sign-up" class="mt-5 w-full" raised />
      <p class="mt-2 text-[#64748b]">
         Already have an account ?
         <span class="text-primary cursor-pointer font-semibold">Login</span>
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
