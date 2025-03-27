import { createRouter, createWebHistory } from 'vue-router';

// pages
import CategoriesView from '@/views/CategoriesView.vue';
import ProductsView from '@/views/ProductsView.vue';
import HomeView from '@/views/HomeView.vue';

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
         path: '/products/:category',
         name: 'products',
         component: ProductsView,
         props: true,
         meta: {
            label: 'Products',
            breadcrumb: (route) => [
               { label: 'CATEGORIES', route: '/categories' },
               {
                  label: route.params.category.toUpperCase(),
                  route: `/products/${route.params.category}`,
               },
            ],
         },
      },
   ],
});
// Nav guard to process dynamic breadcrumbs
router.beforeEach((to, from, next) => {
   if (typeof to.meta.breadcrumb === 'function') {
      to.meta.breadcrumb = to.meta.breadcrumb(to);
   }

   next();
});

export default router;
