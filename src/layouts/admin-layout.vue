<template>
  <div class="layout-wrapper">
    <Topbar />
    <div class="layout-body">
      <Sidebar />
      <main class="content-area transition-all duration-300"
        :class="{ 'content-shrink': sidebarExpanded, 'content-full': !sidebarExpanded }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/common/top-bar.vue';
import Sidebar from '@/components/admin/side-bar.vue';
import { ref, provide } from 'vue';

export default {
  components: { Topbar, Sidebar },
  setup() {
    const sidebarExpanded = ref(false);
    const currentLabel = ref('');

    provide('sidebarExpanded', sidebarExpanded);
    provide('currentLabel', currentLabel);

    return { sidebarExpanded };
  }
};
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-area {
  overflow-y: auto;
  padding: 0.5rem;
  transition: margin-left 0.3s ease;
  width: 100%;
  height: 100%;
}

.content-full {
  margin-left: 4rem;
}
</style>