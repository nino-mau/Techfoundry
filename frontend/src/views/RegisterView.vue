<script setup>
import FormRegister from '@/components/main/FormRegister.vue';
</script>

<template>
   <div class="bg-secondary login-page-bg flex h-full items-center justify-center pb-20">
      <FormRegister />
   </div>
</template>

<style scoped>
.login-page-bg {
   background: rgb(3, 169, 244);
   background: linear-gradient(0deg, rgba(3, 169, 244, 1) 0%, rgba(255, 255, 255, 1) 59%);
}
</style>
