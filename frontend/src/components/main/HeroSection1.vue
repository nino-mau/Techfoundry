<script setup>
// primevue
import { Button } from 'primevue';

// components
import BrandLogosSection from '../ui/BrandLogosSection.vue';
</script>

<template>
    <div class="flex flex-col justify-end items-start pb-18">
        <div class="flex flex-col justify-center items-start gap-5 mb-15">
            <p class="text-secondary">MAKING DIFFERENT IDEAS</p>
            <h1 class="font-bold text-[60px]/[64px] text-secondary">
                One Place <br />
                All Components
            </h1>
            <p class="text-secondary text-[18px]">
                Proin ultices scelerisque pretium maecenas purus accumsan nulla <br />
                elementum porta nulla orttitor sodales arcu quamat semorci
            </p>
            <div>
                <Button class="w-[143px] h-[50px]" label="SHOP NOW" />
                <Button class="w-[125px] h-[50px] ml-[12px]" label="EXPLORE" variant="outlined" />
            </div>
        </div>
        <BrandLogosSection />
    </div>
</template>

<style scoped></style>
