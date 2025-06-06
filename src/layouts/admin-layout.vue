<template>
  <div class="h-screen flex flex-col">
    <Topbar />
    <div class="flex-1 flex flex-row min-h-0" style="height: calc(100vh - 56px);">
      <Sidebar class="h-full flex-shrink-0" />
      <main class="flex-1 bg-gray-50 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/common/top-bar.vue'
import Sidebar from '@/components/admin/side-bar.vue'
export default {
  components: { Topbar, Sidebar }
}
</script>
