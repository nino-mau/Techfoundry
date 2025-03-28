// vue
import { createRouter, createWebHistory } from 'vue-router';

// librairies
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// pages
import CategoriesView from '@/views/CategoriesView.vue';
import ProductsView from '@/views/ProductsView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

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
         path: '/login',
         name: 'login',
         component: LoginView,
         meta: {
            label: 'Login',
         },
      },
      {
         path: '/register',
         name: 'register',
         component: RegisterView,
         meta: {
            label: 'Register',
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

//***===== Nav Guards =====***//

router.beforeEach((to, from, next) => {
   NProgress.start(); // show loading bar

   if (typeof to.meta.breadcrumb === 'function') {
      to.meta.breadcrumb = to.meta.breadcrumb(to);
   }

   next();
});

router.afterEach(() => {
   NProgress.done(); // hide loading bar
});

router.onError((error) => {
   console.error('Router Error:', error);
   NProgress.done(); // hide loading bar
});

export default router;
