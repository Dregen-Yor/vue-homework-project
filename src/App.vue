<template>
  <div class="bg-gray-100">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 1px">
        <el-radio-button :value="false">展开目录</el-radio-button>
        <el-radio-button :value="true">收起目录</el-radio-button>
      </el-radio-group>
  </div>
  <main class="flex min-h-screen">
      <!-- <div :class="{'w-64': sidebarOpen, 'w-0': !sidebarOpen}" class="bg-gray-800 text-white transition-all duration-500 overflow-hidden">
          <div class="p-4">
              <h1 class="text-2xl">目录</h1><br>
              <button @click="showIntroduce=!showIntroduce"><h2 class="text-xl text-red-400">介绍</h2></button>
              <ol v-if="showIntroduce">
                <li  v-for="sidebar in sidebarsIntroduce" :key="sidebar"><RouterLink :to="sidebar.path">{{ sidebar.name }}</RouterLink></li>
              </ol>
              <br>
              <button @click="showPowerOn=!showPowerOn"><h2 class="text-xl text-red-400">开机过程</h2></button>
              <ol v-if="showPowerOn">
                <li></li>
              </ol>
          </div>
      </div> -->
      <div>
        
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo h-screen"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <a href="https://github.com/Dregen-Yor/vue-homework-project" target="_blank">
        <el-menu-item index="4" class="">
          <el-icon><img src="@/assets/github-mark.png"></el-icon>
          <template #title>GitHub项目地址</template>
        </el-menu-item></a>
      </el-menu>
      </div>
      
      <div class="flex-grow bg-gray-100">
          <!-- <button class=" mt-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" @click="toggleSidebar" ><img src="@/assets/sidebar.svg" class="w-10 h-10"></button> -->
          <RouterView class=" text-center" />
      </div>
  </main>
</template>
<script>
export default {
  data() {
      return {
          sidebarOpen: true,
          showIntroduce: false,
          showPowerOn: false,
          sidebarsIntroduce: [
            {path: '/', name: 'Home'},
            {path: '/about', name: 'About'}
          ]
      }
  },
  methods: {
      toggleSidebar() {
          this.sidebarOpen = !this.sidebarOpen;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>


<script  setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: screen;
}
.el-menu-item {
    
}
</style>
