// custom css
import './assets/main.css';

// vue/primevue
import { createApp, h } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { definePreset } from '@primeuix/themes';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';
import App from './App.vue';
import router from './router';

// Vue toastify
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Icons
import IconToastSuccess from './components/icons/IconToastSuccess.vue';
import IconToastInfo from './components/icons/IconToastInfo.vue';
import IconToastWarn from './components/icons/IconToastWarn.vue';
import IconToastError from './components/icons/IconToastError.vue';

// Primevue custom theme
const MyPreset = definePreset(Material, {
   semantic: {
      primary: {
         50: '{sky.50}',
         100: '{sky.100}',
         200: '{sky.200}',
         300: '{sky.300}',
         400: '{sky.400}',
         500: '{sky.500}',
         600: '{sky.600}',
         700: '{sky.700}',
         800: '{sky.800}',
         900: '{sky.900}',
         950: '{sky.950}',
      },
      secondary: {
         50: '{blue.500}',
         100: '{blue.600}',
         200: '{blue.700}',
         300: '{blue.800}',
         400: '{blue.900}',
         500: '{--color-secondary}',
         600: '{blue.950}',
      },
   },
});

// Pass custom icon to toastify toasts
const ResolveCustomIcon = (props) => {
   const isColoredTheme = props.theme === 'colored';

   switch (props.type) {
      case 'info':
         return isColoredTheme ? IconToastInfo : h(IconToastInfo, { color: '#3498DB' });
      case 'success':
         return isColoredTheme ? IconToastSuccess : h(IconToastSuccess, { color: '#44bb2e' });
      case 'error':
         return isColoredTheme ? IconToastError : h(IconToastError, { color: '#da5a42' });
      case 'warning':
         return isColoredTheme ? IconToastWarn : h(IconToastWarn, { color: '#eac839' });
      default:
         return undefined;
   }
};

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
   icon: ResolveCustomIcon,
});
app.use(PrimeVue, {
   ripple: true,
   theme: {
      preset: MyPreset,
      options: {
         darkMode: false, // Make sure dark mode is disabled
         colorScheme: 'light', // Explicitly set to light
         darkModeSelector: false,
      },
   },
});

app.mount('#app');
