<template>
  <div class="flex flex-col min-h-screen">
    <Topbar />
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Topbar from '@/components/common/top-bar.vue'
import Header from '@/components/customer/header.vue'
import Footer from '@/components/common/footer.vue'
export default {
  components: { Topbar, Header, Footer }
}
</script>
