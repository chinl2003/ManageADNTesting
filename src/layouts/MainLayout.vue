<template>
  <div class="flex flex-col min-h-screen">
    <Topbar />
    <main class="flex-grow bg-gray-50">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Topbar from '@/components/common/Topbar.vue'
import Footer from '@/components/common/Footer.vue'

export default {
  components: {
    Topbar,
    Footer
  }
}
</script>
