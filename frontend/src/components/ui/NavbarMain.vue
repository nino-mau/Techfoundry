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
</script>

<template>
    <div class="h-[60px] w-full bg-primary flex flex-row">
        <!-- Navbar -->
        <div class="mr-[136px] ml-[136px] w-full">
            <div class="h-full flex flex-row items-center justify-between">
                <!-- Left Section -->
                <div class="flex flex-row items-center h-full gap-5">
                    <!-- Site Title & Logo -->
                    <div class="flex flex-row items-center justify-between">
                        <IconSite color="var(--color-secondary)" width="47px" />
                        <h1 class="text-secondary text-xl font-bold">TechFoundry</h1>
                    </div>
                    <!-- Links -->
                    <a
                        class="underline-hover-effect pt-[2px] text-base text-secondary font-medium cursor-pointer relative"
                        @click="goToHomePage()"
                        >Home</a
                    >

                    <a
                        class="underline-hover-effect pt-[2px] text-base text-secondary font-medium cursor-pointer relative"
                        @click="goToCategoriesPage()"
                        >Products</a
                    >
                    <a
                        class="underline-hover-effect pt-[2px] text-base text-secondary font-medium cursor-pointer relative"
                        >FAQ</a
                    >
                    <div class="flex flex-row items-center gap-1">
                        <IconSearch color="var(--color-secondary)" class="w-[18px]" />
                        <a
                            class="underline-hover-effect pt-[2px] text-base text-secondary font-medium cursor-pointer relative"
                            >Search</a
                        >
                    </div>
                </div>
                <!-- Right Section -->
                <div class="flex flex-row items-center">
                    <a class="flex flex-row cursor-pointer gap-1">
                        <ShoppingBagIcon class="text-secondary w-[25px] stroke-[1.6]" />
                        <p class="text-secondary font-medium pt-[2px]">0</p>
                    </a>
                    <a class="text-secondary font-semibold ml-7 cursor-pointer relative">Login</a>
                    <Button
                        label="Sign Up"
                        class="bg-secondary font-semibold border-secondary border-1 h-[40px] ml-3"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
