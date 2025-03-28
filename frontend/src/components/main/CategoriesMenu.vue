<script setup>
// vue
import { useRouter } from 'vue-router';

const router = useRouter();

const goToProductsPage = (productCategory) => {
   router.push({ name: 'products', params: { category: productCategory } });
};
</script>

<template>
   <div class="flex flex-row justify-between">
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('CPUs')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-cpu.webp"
         />
         <h3 class="text-md text-secondary font-bold">Processors</h3>
      </div>
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('GPUs')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-gpu.webp"
         />
         <h3 class="text-md text-secondary font-bold">Graphics Cards</h3>
      </div>
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('Motherboards')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-motherboard.webp"
         />
         <h3 class="text-md text-secondary font-bold">Motherboards</h3>
      </div>
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('Power Supplies')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-powersupply.webp"
         />
         <h3 class="text-md text-secondary font-bold">Power Supplies</h3>
      </div>
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('RAMs')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-ram.webp"
         />
         <h3 class="text-md text-secondary font-bold">Memory</h3>
      </div>
      <div
         class="flex cursor-pointer flex-col items-center gap-5 transition hover:scale-105"
         @click="goToProductsPage('SSDs')"
      >
         <img
            class="h-[165px] w-[165px] rounded-xl shadow-md"
            src="@/assets/img/components-categories/cat-ssd.webp"
         />
         <h3 class="text-md text-secondary font-bold">Storage</h3>
      </div>
   </div>
</template>

<style scoped></style>
