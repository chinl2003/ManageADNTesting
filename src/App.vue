<!-- App.vue -->
<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  components: { MainLayout }
}
</script>
<style>
/* App.vue */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

</style>