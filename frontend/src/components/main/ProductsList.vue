<script setup>
// vue
import { onMounted, ref } from 'vue';

// primevue
import { DataView, Button, Tag, Rating, Select, Checkbox, Divider } from 'primevue';

// functions
import { callApi } from '@/helpers/api';
import { getImageUrl } from '@/helpers/general';

// icons
import { StarIcon } from '@heroicons/vue/24/solid';
import {
   StarIcon as StarIconOutline,
   ShoppingCartIcon,
   HeartIcon,
} from '@heroicons/vue/24/outline';

// Use to find category name from id
const categoriesHashMap = {
   1: 'Processors',
   2: 'Graphics Cards',
   3: 'Motherboards',
   4: 'Power Supplies',
   5: 'Memory',
   6: 'Solid-State Drive',
};

//***===== State =====***//

const productsData = ref([]);
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
   { label: 'Price High to Low', value: '!price' },
   { label: 'Price Low to High', value: 'price' },
]);

//***===== Functions =====***//

// api wrapper

const getAllProducts = async () => {
   const options = {
      data: {},
      method: 'GET',
      credentials: 'same-origin',
      caller: 'getAllProducts',
      isProtected: false,
   };
   const r = await callApi('/api/products', options);

   // Update products array with new data
   productsData.value.splice(0, productsData.value.length, ...r);
};

// return stock severity value based on quantity
const getStockSeverity = (quantity) => {
   if (quantity > 50) {
      return 'success';
   } else if (quantity > 10) {
      return 'warn';
   } else if (quantity > 0) {
      return 'danger';
   } else {
      return 'danger';
   }
};

// return stock message value based on quantity
const getStockMessage = (quantity) => {
   if (quantity > 50) {
      return 'INSTOCK';
   } else if (quantity > 10) {
      return 'LOWSTOCK';
   } else if (quantity > 0) {
      return 'VERYLOW';
   } else {
      return 'OUTOFSTOCK';
   }
};

const onSortChange = (event) => {
   const value = event.value.value;
   const sortValue = event.value;

   if (value.indexOf('!') === 0) {
      sortOrder.value = -1;
      sortField.value = value.substring(1, value.length);
      sortKey.value = sortValue;
   } else {
      sortOrder.value = 1;
      sortField.value = value;
      sortKey.value = sortValue;
   }
};

//***===== Lifecycle =====***//

onMounted(async () => {
   await getAllProducts();
   console.log(productsData.value);
});
</script>

<template>
   <div class="flex w-full flex-row justify-between">
      <!-- Options Section -->
      <div class="w-[15%] pt-[82px]">
         <Divider type="solid" class="text-secondary border-secondary bg-secondary" />

         <h1 class="text-secondary mb-5 font-semibold">Disponibility</h1>
         <div class="flex items-center gap-2">
            <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="text-secondary"> In Stock </label>
         </div>
         <Divider type="solid" class="text-secondary border-secondary bg-secondary" />
         <h1 class="text-secondary mt-5 mb-5 font-semibold">Brands</h1>
         <div class="card flex flex-col justify-center gap-4">
            <div class="flex items-center gap-2">
               <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
               <label for="ingredient1" class="text-secondary"> AMD </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox v-model="pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
               <label for="ingredient2" class="text-secondary"> NVIDIA </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox v-model="pizza" inputId="ingredient3" name="pizza" value="Pepper" />
               <label for="ingredient3" class="text-secondary"> ASUS </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox v-model="pizza" inputId="ingredient4" name="pizza" value="Onion" />
               <label for="ingredient4" class="text-secondary"> SAMSUNG </label>
            </div>
         </div>
      </div>
      <!-- List Section -->
      <div class="w-[75%]">
         <DataView
            :value="productsData"
            :sortOrder="sortOrder"
            :sortField="sortField"
            :layout="'grid'"
         >
            <template #header>
               <div class="flex items-end justify-end">
                  <Select
                     v-model="sortKey"
                     :options="sortOptions"
                     optionLabel="label"
                     placeholder="Sort Products"
                     @change="onSortChange($event)"
                  />
               </div>
            </template>
            <template #grid="slotProps">
               <div class="grid grid-cols-12 gap-4">
                  <div v-for="(item, index) in slotProps.items" :key="index" class="col-span-6 p-2">
                     <!-- Product -->
                     <div
                        class="border-secondary flex min-h-[430px] flex-col justify-between rounded-[5px] border-1 p-5 shadow-md"
                     >
                        <div class="bg-surface-50 relative flex justify-center rounded p-4">
                           <!-- Product Image -->
                           <div>
                              <img
                                 class="w-full rounded"
                                 :src="getImageUrl('products', item.image_name)"
                                 :alt="item.name"
                                 style="max-width: 300px"
                              />
                           </div>
                           <!-- Quantity -->
                           <div class="rounded-border absolute top-[0px] left-[0px]">
                              <Tag
                                 :value="getStockMessage(item.quantity)"
                                 :severity="getStockSeverity(item.quantity)"
                                 rounded
                              ></Tag>
                           </div>
                        </div>
                        <div class="pt-6">
                           <div class="flex flex-row items-start justify-between gap-2">
                              <div>
                                 <span class="text-secondary text-sm font-medium opacity-80">{{
                                    categoriesHashMap[item.category_id]
                                 }}</span>
                                 <div
                                    class="text-secondary mt-1 min-h-[56px] overflow-hidden text-lg font-semibold"
                                 >
                                    {{ item.name }}
                                 </div>
                              </div>
                           </div>
                           <div class="mt-6 flex flex-col gap-6">
                              <div class="flex flex-row justify-between">
                                 <span class="text-secondary text-xl font-semibold"
                                    >${{ item.price }}</span
                                 >
                                 <div class="flex flex-row">
                                    <Rating v-model="item.rating" :stars="5" readonly>
                                       <template #onicon>
                                          <StarIcon class="text-primary h-[22px] w-[22px]" />
                                       </template>
                                       <template #officon>
                                          <StarIconOutline class="text-primary h-[22px] w-[22px]" />
                                       </template>
                                    </Rating>
                                 </div>
                              </div>
                              <div class="flex gap-2">
                                 <Button
                                    :disabled="item.quantity === 0"
                                    class="flex-auto whitespace-nowrap"
                                 >
                                    <ShoppingCartIcon class="h-[25px] w-[25px] stroke-[1.5]" />
                                    <span class="text-lg font-bold">BUY NOW</span>
                                 </Button>
                                 <Button outlined>
                                    <HeartIcon class="h-[22px] w-[22px] stroke-[1.5]" />
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </template>
         </DataView>
      </div>
   </div>
</template>

<style scoped>
/* Custom rating */
.p-rating {
   gap: 1px;
}

/* Custom dataview */
:deep(.p-dataview-header) {
   border-width: 0px;
}

/* Custom Select Button */
:deep(.p-select) {
   border-color: var(--color-secondary) !important;
}
:deep(.p-select-dropdown),
:deep(.p-select-label) {
   color: var(--color-secondary) !important;
}
</style>
