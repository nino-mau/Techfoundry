<script setup>
// vue
import { onMounted, ref, defineProps } from 'vue';

// store
import { useGlobalStore } from '@/stores/globalStore';

// primevue
import {
   DataView,
   Button,
   Tag,
   Rating,
   Select,
   Checkbox,
   Divider,
   InputGroup,
   InputGroupAddon,
   InputText,
   ProgressSpinner,
} from 'primevue';

// functions
import { callApi } from '@/helpers/api';
import { getImageUrl } from '@/helpers/general';

// icons
import IconSearch from '../icons/IconSearch.vue';
import IllustrationEmpty from '../illustrations/IllustrationEmpty.vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import {
   StarIcon as StarIconOutline,
   ShoppingCartIcon,
   HeartIcon,
} from '@heroicons/vue/24/outline';

//***===== Setup =====***//

// Use to find category name from id
const categoriesHashMap = {
   1: 'Processors',
   2: 'Graphics Cards',
   3: 'Motherboards',
   4: 'Power Supplies',
   5: 'Memory',
   6: 'Solid-State Drive',
};

const globalStore = useGlobalStore();

const props = defineProps({
   productCat: {
      type: Number,
      default: 0,
   },
});

//***===== State =====***//

const productsData = ref([]);

// sorting
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
   { label: 'Price High to Low', value: '!price' },
   { label: 'Price Low to High', value: 'price' },
]);

// filtering
const isInStock = ref(false);
const selectedCat = ref(null);
const selectedBrand = ref(null);
const searchedValue = ref(null);

//***===== Functions =====***//

// api wrapper

const getProducts = async () => {
   selectedCat.value = props.productCat;

   console.log(selectedCat.value);
   console.log(props.productCat);

   let url = '';

   if (selectedCat.value === 0) {
      url = '/api/products';
   } else {
      url = `/api/products?cat_id=${selectedCat.value}`;
   }

   const options = {
      data: {},
      method: 'GET',
      credentials: 'same-origin',
      caller: 'getProducts',
      isProtected: false,
   };
   const r = await callApi(url, options);

   // Update products array with new data
   productsData.value.splice(0, productsData.value.length, ...r);
};

const getFilteredProducts = async (
   catId = null,
   brandId = null,
   searcheValue = null,
   isInStock = null,
) => {
   const options = {
      data: {},
      method: 'GET',
      credentials: 'same-origin',
      caller: 'getFilteredProducts',
      isProtected: false,
   };

   // Build query params
   const params = new URLSearchParams();

   if (catId) params.append('cat_id', catId);
   if (brandId) params.append('brand_id', brandId);
   if (searcheValue) params.append('search_value', searcheValue);
   if (isInStock === true) params.append('instock', 'true');

   let url = '/api/products';
   const queryString = params.toString();

   if (queryString) {
      url += `?${queryString}`;
   }

   const r = await callApi(url, options);

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

// use dataview inbuilt sorting, sort by price
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

const handleFiltering = (brandId) => {
   // handle unselecting brand filter
   if (selectedBrand.value === brandId) {
      selectedBrand.value = null;
   } else {
      selectedBrand.value = brandId;
   }
   getFilteredProducts(null, selectedBrand.value, searchedValue.value, isInStock.value); // call api
};

const handleInStockFilter = () => {
   getFilteredProducts(null, selectedBrand.value, searchedValue.value, isInStock.value);
};

const handleSearching = (searchValue) => {
   getFilteredProducts(null, selectedBrand.value, searchValue, isInStock.value);
};

//***===== Lifecycle =====***//

onMounted(async () => {
   console.log(props.productCat);

   await getProducts();
});
</script>

<template>
   <div class="flex w-full flex-row justify-between">
      <!-- Options Section -->
      <div class="w-[25%] pt-[12px] pr-5">
         <!-- Search Bar -->
         <InputGroup class="h-[55px] pb-[12px]">
            <InputText
               v-model="searchedValue"
               placeholder="Search..."
               @keyup.enter="handleSearching(searchedValue)"
            />
            <InputGroupAddon>
               <Button @click="handleSearching(searchedValue)" class="border-primary">
                  <IconSearch color="white" width="21" />
               </Button>
            </InputGroupAddon>
         </InputGroup>

         <Divider type="solid" class="text-secondary border-secondary bg-secondary mt-[8px]" />

         <!-- In Stock Filter -->
         <h1 class="text-secondary mb-5 font-semibold">Disponibility</h1>
         <div class="flex items-center gap-2">
            <Checkbox
               v-model="isInStock"
               :binary="true"
               inputId="inStockCheckbox"
               @change="handleInStockFilter()"
            />
            <label for="inStockCheckbox" class="text-secondary"> In Stock </label>
         </div>
         <Divider type="solid" class="text-secondary border-secondary bg-secondary" />

         <!-- Brand Filter -->
         <h1 class="text-secondary mt-5 mb-5 font-semibold">Brands</h1>
         <div class="card flex flex-col justify-center gap-4">
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 1"
                  :binary="true"
                  inputId="amdCheckbox"
                  @change="handleFiltering(1)"
               />
               <label for="amdCheckbox" class="text-secondary"> AMD </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 7"
                  :binary="true"
                  inputId="antecCheckbox"
                  @change="handleFiltering(7)"
               />
               <label for="antecCheckbox" class="text-secondary"> Antec </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 3"
                  :binary="true"
                  inputId="asusCheckbox"
                  @change="handleFiltering(3)"
               />
               <label for="asusCheckbox" class="text-secondary"> Asus </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 8"
                  :binary="true"
                  inputId="kingstonCheckbox"
                  @change="handleFiltering(8)"
               />
               <label for="kingstonCheckbox" class="text-secondary"> Kingston </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 4"
                  :binary="true"
                  inputId="foxspiritCheckbox"
                  @change="handleFiltering(4)"
               />
               <label for="foxspiritCheckbox" class="text-secondary"> Fox Spirit </label>
            </div>
            <div class="flex items-center gap-2">
               <Checkbox
                  :modelValue="selectedBrand === 9"
                  :binary="true"
                  inputId="kioxiaCheckbox"
                  @change="handleFiltering(9)"
               />
               <label for="kioxiaCheckbox" class="text-secondary"> KIOXIA </label>
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
                     class="flex h-[43px] flex-row items-center"
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
            <template #empty>
               <div
                  v-if="!globalStore.isLoading"
                  class="m-35 flex flex-col items-center justify-center"
               >
                  <!-- <IconSearch color="var(--color-primary)" width="40px" /> -->
                  <IllustrationEmpty color="var(--color-primary)" width="125px" />
                  <h3 class="text-primary text-2xl font-bold">No Item Found</h3>
               </div>
               <div v-else class="m-40 flex items-center justify-center">
                  <ProgressSpinner />
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
</style>
