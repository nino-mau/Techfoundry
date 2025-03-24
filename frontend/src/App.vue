<script setup>
// vue
import { onMounted } from 'vue';

async function apiTest() {
   try {
      const response = await fetch('http://localhost:8000/', {
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
   <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
         <h1>Test</h1>
      </div>
   </header>
</template>

<style scoped>
.wrapper {
   height: 100vh;
   width: 100vw;
}
</style>
