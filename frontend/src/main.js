import './assets/main.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import { definePreset } from '@primeuix/themes';
import { createPinia } from 'pinia';
import 'primeicons/primeicons.css';

import App from './App.vue';
import router from './router';

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

const app = createApp(App);

app.use(createPinia());
app.use(router);
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
