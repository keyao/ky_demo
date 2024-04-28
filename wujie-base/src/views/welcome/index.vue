<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <WujieVue
  width="100%"
  height="100%"
  name='my-app' 
  :sync="true"
  :alive="true"
  url='http://localhost:5173'></WujieVue>
</template>
