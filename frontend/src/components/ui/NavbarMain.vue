<script setup>
// vue
import { useRouter } from 'vue-router';

// icon
import IconSite from '../icons/IconSite.vue';
import IconSearch from '../icons/IconSearch.vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';

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
                    <div class="flex flex-row items-center justify-between pb-[4px]">
                        <IconSite color="var(--color-secondary)" width="47px" />
                        <h1 class="text-secondary text-xl font-bold">TechFoundry</h1>
                    </div>
                    <!-- Links -->
                    <a
                        class="text-base text-secondary font-medium cursor-pointer"
                        @click="goToHomePage()"
                        >Home</a
                    >

                    <a
                        class="text-base text-secondary font-medium cursor-pointer"
                        @click="goToCategoriesPage()"
                        >Products</a
                    >
                    <a class="text-base text-secondary font-medium cursor-pointer">FAQ</a>
                    <div class="flex flex-row items-center gap-1">
                        <IconSearch color="var(--color-secondary)" class="w-[18px]" />
                        <a class="text-base text-secondary font-medium cursor-pointer">Search</a>
                    </div>
                </div>
                <!-- Right Section -->
                <div class="flex flex-row items-center">
                    <a class="flex flex-row cursor-pointer">
                        <ShoppingBagIcon class="text-secondary w-[25px]" />
                        <p class="text-secondary font-medium">1</p>
                    </a>
                    <a class="text-secondary font-medium ml-5 cursor-pointer">Login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
