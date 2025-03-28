<script setup>
// vue
import { useRouter } from 'vue-router';

// icon
import IconSite from '../icons/IconSite.vue';
import IconSearch from '../icons/IconSearch.vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';

// primevue
import { Button } from 'primevue';

const router = useRouter();

const goToHomePage = () => {
   router.push('/');
};

const goToCategoriesPage = () => {
   router.push('/categories');
};

const goToLoginPage = () => {
   router.push('/login');
};

const goToRegisterPage = () => {
   router.push('/register');
};
</script>

<template>
   <div class="bg-primary flex h-[60px] w-full flex-row">
      <!-- Navbar -->
      <div class="mr-[136px] ml-[136px] w-full">
         <div class="flex h-full flex-row items-center justify-between">
            <!-- Left Section -->
            <div class="flex h-full flex-row items-center gap-5">
               <!-- Site Title & Logo -->
               <div class="flex flex-row items-center justify-between">
                  <IconSite color="var(--color-secondary)" width="47px" />
                  <h1 class="text-secondary text-xl font-bold">TechFoundry</h1>
               </div>
               <!-- Links -->
               <a
                  class="underline-hover-effect text-secondary relative cursor-pointer pt-[2px] text-base font-medium"
                  @click="goToHomePage()"
                  >Home</a
               >

               <a
                  class="underline-hover-effect text-secondary relative cursor-pointer pt-[2px] text-base font-medium"
                  @click="goToCategoriesPage()"
                  >Products</a
               >
               <a
                  class="underline-hover-effect text-secondary relative cursor-pointer pt-[2px] text-base font-medium"
                  >FAQ</a
               >
               <div class="flex flex-row items-center gap-1">
                  <IconSearch color="var(--color-secondary)" class="w-[18px]" />
                  <a
                     class="underline-hover-effect text-secondary relative cursor-pointer pt-[2px] text-base font-medium"
                     >Search</a
                  >
               </div>
            </div>
            <!-- Right Section -->
            <div class="flex flex-row items-center">
               <a class="flex cursor-pointer flex-row gap-[1px]">
                  <ShoppingBagIcon class="text-secondary w-[25px] stroke-[1.6]" />
                  <p class="text-secondary pt-[2px] font-medium">0</p>
               </a>
               <Button
                  class="text-secondary relative ml-7 h-[40px] cursor-pointer font-bold"
                  @click="goToLoginPage()"
               >
                  <span class="font-semibold">Login</span>
               </Button>
               <Button
                  label="Sign Up"
                  class="bg-secondary border-secondary ml-1 h-[40px] border-1 font-semibold"
                  @click="goToRegisterPage()"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped></style>
