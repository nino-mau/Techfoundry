<script setup>
// components
import PageTitleHeader from '@/components/ui/PageTitleHeader.vue';
import CategoriesMenu from '@/components/main/CategoriesMenu.vue';
</script>

<template>
    <div class="flex flex-col h-full">
        <div>
            <PageTitleHeader />
        </div>
        <div class="mr-[136px] ml-[136px] mt-[5rem]">
            <CategoriesMenu />
        </div>
    </div>
</template>

<style scoped></style>
