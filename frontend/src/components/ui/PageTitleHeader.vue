<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrumb from 'primevue/breadcrumb';

const route = useRoute();

// Get the breadcrumb items excluding "Home"
const items = computed(() => {
    const breadcrumbs = route.meta.breadcrumb || [];
    // Skip index 0 (Home) only if there are breadcrumbs
    return breadcrumbs.length > 0 ? breadcrumbs.slice(1) : [];
});

// Force breadcrumb to show even if only home is present
const homeItem = {
    label: 'Home',
    url: '/',
    icon: 'pi pi-home', // Use PrimeIcons class
};
</script>

<template>
    <div class="breadcrumb-container">
        <Breadcrumb :model="items" :home="homeItem">
            <!-- Home icon template override using PrimeIcons -->
            <template #home="{ item, props }">
                <li v-bind="props.home" class="home-item">
                    <router-link to="/" class="p-menuitem-link">
                        <i class="pi pi-home text-secondary" style="font-size: 1.25rem"></i>
                        <span v-if="false" class="p-menuitem-text">{{ item.label }}</span>
                    </router-link>
                </li>
            </template>

            <!-- Items template -->
            <template #item="{ item, props }">
                <router-link v-if="item.route" :to="item.route" custom v-slot="{ navigate, href }">
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span class="font-semibold text-primary">{{ item.label }}</span>
                    </a>
                </router-link>
                <a
                    v-else
                    :href="item.url || '#'"
                    :target="item.target"
                    v-bind="props.action"
                    class="cursor-pointer"
                >
                    <span class="text-surface-700">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>

        <h1 class="text-[60px] text-secondary font-bold">
            {{ route.meta.title || 'Categories' }}
        </h1>
    </div>
</template>

<style scoped>
.breadcrumb-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Home item styling */
:deep(.home-item) {
    display: flex;
}

:deep(.p-menuitem-link) {
    display: flex;
    align-items: center;
}

/* Make sure the home icon is visible */
:deep(.p-breadcrumb .home-item .pi-home) {
    display: inline-block;
    color: var(--color-secondary);
    margin-right: 0.5rem;
}
</style>
