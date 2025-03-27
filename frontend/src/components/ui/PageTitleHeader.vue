<script setup>
// vue
import { onMounted, markRaw, ref } from 'vue';
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
let pageName = isObjEmpty(route.params) ? ref(route.meta.label) : ref(route.params.category);

const breadcrumbHomeItem = ref({
   icon: markRaw(HomeIcon),
   label: 'HOME',
   route: '/',
});
let breadcrumbItems = ref([]);

//***===== Functions =====***//

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
      <p class="text-secondary text-base font-medium">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at nisl <br />
         erat. Proin a elit ac nunc egestas porttitor.
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
