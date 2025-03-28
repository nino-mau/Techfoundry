<script setup>
import { defineProps } from 'vue';

defineProps({
   color: String,
   width: [String, Number],
   svgClass: {
      type: [String, Number],
      required: false,
   },
});
</script>

<template>
   <svg
      role="img"
      alt="Empty"
      :width="width"
      :fill="color"
      :class="svgClass"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      xml:space="preserve"
   >
      <path
         d="M10.3,94.5h61.1c10.8,0,19.6-8.8,19.6-19.6s-8.8-19.6-19.6-19.6S51.7,64,51.7,74.9c0,7.4,4.1,13.8,10.1,17.1H11.5V8h45.1  v19.8c0,0.7,0.6,1.3,1.3,1.3h13.2v-2.5h-12V9.8l15.3,15.6v23.2h2.5V24.9c0-0.3-0.1-0.6-0.4-0.9L58.7,5.9c-0.2-0.2-0.6-0.4-0.9-0.4  H10.3C9.6,5.5,9,6,9,6.7v86.5C9,94,9.6,94.5,10.3,94.5z M54.2,74.9c0-9.4,7.7-17.1,17.1-17.1s17.1,7.7,17.1,17.1S80.8,92,71.4,92  S54.2,84.3,54.2,74.9z"
      />
      <polygon
         points="78.3,66.1 71.4,73.1 64.4,66.1 62.6,67.9 69.6,74.9 62.6,81.8 64.4,83.6 71.4,76.6 78.3,83.6 80.1,81.8 73.1,74.9   80.1,67.9 "
      />
   </svg>
</template>

<style scoped></style>
