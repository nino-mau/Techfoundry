import { createRouter, createWebHistory } from 'vue-router';

// pages
import CategoriesView from '@/views/CategoriesView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                breadcrumb: [{ label: 'Home', route: '/' }],
            },
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesView,
            meta: {
                breadcrumb: [{ label: 'Home', route: '/' }, { label: 'Categories' }],
            },
        },
    ],
});

export default router;
