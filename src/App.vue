<template>
  <div class="bg-gray-100 ">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 1px">
        <el-radio-button :value="false">展开目录</el-radio-button>
        <el-radio-button :value="true">收起目录</el-radio-button>
      </el-radio-group>
  </div>
  <main class="flex min-h-screen">
      <div class="fixd ">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo h-screen fixed overflow-auto"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><House /></el-icon>
              <span>介绍</span>
            </template>
            <el-menu-item-group index="1-1">
              <RouterLink v-for="sidebar in sidebarsIntroduce" :key="sidebar" :to="sidebar.path"><el-menu-item >{{ sidebar.name }}</el-menu-item></RouterLink>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><img src="@/assets/computer.svg"></el-icon>
              <span>开机</span>
            </template>
            <el-menu-item-group index="2-2">
              <RouterLink v-for="sidebar in sidebarsPowerOn" :key="sidebar" :to="sidebar.path"><el-menu-item>{{ sidebar.name }}</el-menu-item></RouterLink>
            </el-menu-item-group>
          </el-sub-menu>
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
      <!-- <el-scrollbar height="400px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </el-scrollbar> -->
      
      <div class="flex-grow bg-gray-100  overscroll-contain">
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
          ],
          sidebarsPowerOn: [
            {path: '/boot', name: 'Boot'},
            {path: '/segment', name: 'Segment'}
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
  House,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: screen;
}
.el-menu-item {
    
}
</style>
