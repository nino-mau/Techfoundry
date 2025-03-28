<script setup>
// vue
import { onMounted } from 'vue';

// primevue

// components
import NavbarMain from './components/ui/NavbarMain.vue';

async function apiTest() {
   try {
      const response = await fetch('http://localhost:8000/test', {
         method: 'GET',
         headers: {},
      });
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }
      const r = await response.json();
      console.log(r);
   } catch (error) {
      console.error('Fetch error:', error);
      throw error;
   }
}
onMounted(async () => {
   await apiTest();
});

console.log('test');
</script>

<template>
   <header class="h-[60px] min-h-[60px] w-full">
      <NavbarMain />
   </header>
   <main class="h-full">
      <RouterView />
   </main>
</template>

<style scoped>
.wrapper {
   height: 100vh;
   width: 100vw;
}
</style>
