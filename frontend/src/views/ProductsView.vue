<script setup>
// vue
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// pages
import PageTitleHeader from '@/components/ui/PageTitleHeader.vue';
import ProductsList from '@/components/main/ProductsList.vue';

const route = useRoute();
const productCat = ref(null);

//***===== Lifecycle =====***//

onMounted(() => {
   productCat.value = route.params.category;
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
