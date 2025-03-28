<script setup>
// primevue
import { Button } from 'primevue';

// components
import BrandLogosSection from '../ui/BrandLogosSection.vue';
</script>

<template>
   <div class="flex flex-col items-start justify-end pb-18">
      <div class="mb-15 flex flex-col items-start justify-center gap-5">
         <p class="text-secondary">MAKING DIFFERENT IDEAS</p>
         <h1 class="text-secondary text-[60px]/[64px] font-bold">
            One Place <br />
            All Components
         </h1>
         <p class="text-secondary text-[18px]">
            Proin ultices scelerisque pretium maecenas purus accumsan nulla <br />
            elementum porta nulla orttitor sodales arcu quamat semorci
         </p>
         <div>
            <Button class="h-[50px] w-[143px]" label="SHOP NOW" />
            <Button class="ml-[12px] h-[50px] w-[125px]" label="EXPLORE" variant="outlined" />
         </div>
      </div>
      <BrandLogosSection />
   </div>
</template>

<style scoped></style>
