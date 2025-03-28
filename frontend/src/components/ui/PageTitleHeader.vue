<script setup>
// vue
import { onMounted, markRaw, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// primevue
import Breadcrumb from 'primevue/breadcrumb';

// icons
import { HomeIcon } from '@heroicons/vue/24/outline';

// functions
import { isObjEmpty } from '@/helpers/general';

const route = useRoute();

//***===== State =====***//

// handle setting the right page name
let pageName = ref(isObjEmpty(route.params) ? ref(route.meta.label) : ref(route.params.category));

const breadcrumbHomeItem = ref({
   icon: markRaw(HomeIcon),
   label: 'HOME',
   route: '/',
});
let breadcrumbItems = ref([]);

//***===== Functions =====***//

// return categories description based on name of the category page
const getCategoryDescription = computed(() => {
   const desc = {
      CPUs: 'Choose from various generations including high-performance gaming processors, workstation-grade CPUs, and budget-friendly options with different core counts and clock speeds.',
      GPUs: 'Our selection includes the latest RTX and Radeon series cards with various VRAM capacities, cooling solutions, and performance tiers.',
      Motherboards:
         'Compatible with various CPU sockets and offering different expansion options, connectivity, and overclocking capabilities.',
      'Power Supplies':
         'Available in modular, semi-modular, and non-modular designs to power your entire system safely and efficiently.',
      RAMs: 'Choose from DDR4 and DDR5 options with different latencies, RGB lighting effects, and performance profiles for gaming and productivity.',
      SSDs: 'Options range from high-performance PCIe 4.0 drives to reliable backup storage with various capacities and form factors.',
   };
   return (
      desc[pageName.value] ||
      'Explore our wide range of high-quality computer components and accessories.'
   );
});

//***===== Lifecycle =====***//

onMounted(() => {
   // Update path breadcrumb with route data
   breadcrumbItems.value.splice(0, breadcrumbItems.value.length, ...route.meta.breadcrumb);
});
</script>

<template>
   <div class="mt-[77px] mr-[136px] ml-[136px] flex flex-col justify-center">
      <Breadcrumb :home="breadcrumbHomeItem" :model="breadcrumbItems" class="text-secondary">
         <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
               <a :href="href" v-bind="props.action" @click="navigate" class="breadcrumb-link">
                  <component
                     :is="item.icon"
                     class="text-secondary relative top-[-1px] w-[24px] stroke-[1.7]"
                  />
                  <span class="text-secondary text-base font-semibold">{{ item.label }}</span>
               </a>
            </router-link>
            <!-- <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a> -->
         </template>
      </Breadcrumb>
      <h1 class="text-secondary text-[64px] font-bold">{{ pageName }}</h1>
      <p class="text-secondary pr-[20rem] text-base">
         {{ getCategoryDescription }}
      </p>
   </div>
</template>

<style scoped>
/* Custom style for breadcrumb component */
:deep(.p-breadcrumb) {
   padding: 0;
}
:deep(.p-breadcrumb-list) {
   gap: 20px !important;
}
:deep(.p-breadcrumb-separator) {
   color: var(--color-secondary);
}

/* Hover for breadcrumb link */
.breadcrumb-link:hover,
.breadcrumb-link:hover span {
   text-decoration: underline;
}
</style>
