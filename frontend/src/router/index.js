import { createRouter, createWebHistory } from 'vue-router';

// pages
import CategoriesView from '@/views/CategoriesView.vue';
import ProductsListView from '@/views/ProductsListView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                label: 'Home',
            },
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesView,
            meta: {
                label: 'Categories',
                breadcrumb: [{ label: 'CATEGORIES', route: '/categories' }],
            },
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsListView,
            meta: {
                label: 'Products',
                breadcrumb: [{ label: 'PRODUCTS', route: '/products' }],
            },
        },
    ],
});

export default router;
