<script setup>
// vue
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// pages
import PageTitleHeader from '@/components/ui/PageTitleHeader.vue';
import ProductsList from '@/components/main/ProductsList.vue';

//***===== Setup =====***//

const categoriesHashMap = {
   CPUs: 1,
   GPUs: 2,
   Motherboards: 3,
   'Power Supplies': 4,
   RAMs: 5,
   SSDs: 6,
};

const route = useRoute();
const productCat = computed(() => {
   const category = route.params.category;
   return category ? categoriesHashMap[category] || 0 : 0;
});
</script>

<template>
   <div>
      <PageTitleHeader />
   </div>
   <div class="mt-[5rem] mr-[136px] ml-[136px]">
      <ProductsList :product-cat="productCat" />
   </div>
</template>

<style scoped></style>
