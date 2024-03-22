<template>
  <div class="bg-gray-100 ">

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
      @select="handleSelect">
      <el-menu-item index="0">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 0px">
          <el-radio-button :value="false">展开目录</el-radio-button>
          <el-radio-button :value="true">收起目录</el-radio-button>
        </el-radio-group>
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="one" >
        <template #title>
          <el-icon>
            <House />
          </el-icon>
          <span>介绍</span>
        </template>
        <el-menu-item-group index="1-1">
          <RouterLink v-for="sidebar in sidebarsIntroduce" :key="sidebar" :to="sidebar.path"><el-menu-item>{{sidebar.name}}</el-menu-item></RouterLink>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="two">
        <template #title>
          <el-icon><img src="@/assets/computer.svg"></el-icon>
          <span>开机</span>
        </template>
        <el-menu-item-group index="2-2">
          <RouterLink v-for="sidebar in sidebarsPowerOn" :key="sidebar" :to="sidebar.path"><el-menu-item>{{ sidebar.name
              }}</el-menu-item></RouterLink>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu>
          <template #title>
            <el-icon><img src="@/assets/binary.svg"></el-icon>
            <span>原理</span>
          </template>
          <el-menu-item-group index="3-3">
            <RouterLink v-for="sidebar in sidebarsprinciples" :key="sidebar" :to="sidebar.path"><el-menu-item>{{
                sidebar.name
                }}</el-menu-item></RouterLink>
          </el-menu-item-group>
        </el-sub-menu>
      <a href="https://github.com/Dregen-Yor/vue-homework-project" target="_blank">
        <el-menu-item index="4" class="">
          <el-icon><img src="@/assets/github-mark.png"></el-icon>
          <template #title>GitHub项目地址</template>
        </el-menu-item></a>
    </el-menu>
  </div>
  <main class="flex min-h-screen">
    <!-- <el-scrollbar height="1000px" class=" fixed" id="1"> -->
    <div class="fixd ">
      <el-menu default-active="2" class="el-menu-vertical-demo h-screen fixed overflow-auto" :collapse="isCollapse"
        @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1" class="">
          <template #title>
            <el-icon>
              <House />
            </el-icon>
            <span>介绍</span>
          </template>
          <el-menu-item-group index="1-1">
            <RouterLink v-for="sidebar in sidebarsIntroduce" :key="sidebar" :to="sidebar.path"><el-menu-item>{{
      sidebar.name }}</el-menu-item></RouterLink>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><img src="@/assets/computer.svg"></el-icon>
            <span>开机</span>
          </template>
          <el-menu-item-group index="2-2">
            <RouterLink v-for="sidebar in sidebarsPowerOn" :key="sidebar" :to="sidebar.path"><el-menu-item>{{
                sidebar.name
                }}</el-menu-item></RouterLink>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><img src="@/assets/binary.svg"></el-icon>
            <span>原理</span>
          </template>
          <el-menu-item-group index="3-3">
            <RouterLink v-for="sidebar in sidebarsprinciples" :key="sidebar" :to="sidebar.path"><el-menu-item>{{
                sidebar.name
                }}</el-menu-item></RouterLink>
          </el-menu-item-group>
        </el-sub-menu>
        <a href="https://github.com/Dregen-Yor/vue-homework-project" target="_blank">
          <el-menu-item index="4" class="">
            <el-icon><img src="@/assets/github-mark.png"></el-icon>
            <template #title>GitHub项目地址</template>
          </el-menu-item></a>
      </el-menu>
    </div>
    <!-- </el-scrollbar> -->
    <div class="flex-grow bg-gray-100  overscroll-contain">
      <el-scrollbar height="1000px">
        <RouterView class=" text-center" />
      </el-scrollbar>

    </div>
  </main>
</template>
<script>
import {ref} from 'vue';
export default {
  data() {
    return {
      sidebarOpen: true,
      showIntroduce: false,
      showPowerOn: false,
      activeIndex: ref('0'),
      sidebarsIntroduce: [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' }
      ],
      sidebarsPowerOn: [
        { path: '/boot', name: 'Boot' },
        { path: '/segment', name: 'Segment' },
        { path: '/io', name: 'IO' },
      ],
      sidebarsprinciples: [
        {path: '/compiler' , name: 'Compiler'},
        {path: '/risc-v-binary',name:'RISC-V指令集与二进制'},
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


<script setup>
import {
  House,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 237px;
  min-height: screen;
}

.el-menu-item {}
</style>
