<script setup>
// vue
import { onMounted, markRaw, ref } from 'vue';
import { useRoute } from 'vue-router';

// primevue
import Breadcrumb from 'primevue/breadcrumb';

// icons
import { HomeIcon } from '@heroicons/vue/24/outline';

const route = useRoute();

//***===== State =====***//

const breadcrumbHomeItem = ref({
    icon: markRaw(HomeIcon),
    label: 'HOME',
    route: '/',
});
let breadcrumbItems = ref([]);
let pageName = ref(route.meta.label);

//***===== Lifecycle =====***//

onMounted(() => {
    // Update path breadcrumb with route data
    breadcrumbItems.value.splice(0, breadcrumbItems.value.length, ...route.meta.breadcrumb);
});

// Get the breadcrumb items excluding "Home"
</script>

<template>
    <div class="flex flex-col justify-center mr-[136px] ml-[136px] mt-[77px]">
        <Breadcrumb :home="breadcrumbHomeItem" :model="breadcrumbItems" class="text-secondary">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <component :is="item.icon" class="w-[24px] text-secondary stroke-[1.7]" />
                        <span class="text-secondary text-base font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <!-- <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a> -->
            </template>
        </Breadcrumb>
        <h1 class="text-[64px] font-bold text-secondary">{{ pageName }}</h1>
        <p class="text-base font-medium text-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at nisl <br />
            erat. Proin a elit ac nunc egestas porttitor.
        </p>
    </div>
</template>

<style scoped>
:deep(.p-breadcrumb) {
    padding: 0;
}
:deep(.p-breadcrumb-list) {
    gap: 20px !important;
}
:deep(.p-breadcrumb-separator) {
    color: var(--color-secondary);
}
</style>
