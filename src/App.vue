<template>
  <main class="flex h-screen">
      <div :class="{'w-64': sidebarOpen, 'w-0': !sidebarOpen}" class="bg-gray-800 text-white transition-all duration-500 overflow-hidden">
          <div class="p-4">
              <h1 class="text-2xl">目录</h1><br>
              <button @click="showIntroduce=!showIntroduce"><h2 class="text-xl text-red-400">介绍</h2></button>
              <ol v-if="showIntroduce">
                <li  v-for="sidebar in sidebars" :key="sidebar"><RouterLink :to="sidebar.path">{{ sidebar.name }}</RouterLink></li>
              </ol>
              <h2 class="text-xl text-red-400">开机过程</h2>
          </div>
      </div>
      <div class="flex-grow bg-gray-100">
          <button class=" object-left-top rounded-full" @click="toggleSidebar" ><img src="@/assets/sidebar.svg" class="w-10 h-10"></button>
          <RouterView />
      </div>
    </main>
</template>
<script>
export default {
  data() {
      return {
          sidebarOpen: true,
          showIntroduce: false,
          sidebars: [
            {path: '/', name: 'Home'},
            {path: '/about', name: 'About'}
          ]
      }
  },
  methods: {
      toggleSidebar() {
          this.sidebarOpen = !this.sidebarOpen;
      }
  }
}
</script>