<script setup>
import HelloWorld from '../components/HelloWorld.vue'
// import '../assets/main.css'
</script>
<template>
  <div class="flex flex-col justify-center items-center">
    <br><br>
    <el-card style="width: 90vh;">
    <main class="flex items-center justify-center min-h-80 max-w-4xl space-x-10">
      <img src="@/assets/logo.png" class="w-40 h-40">
      <div class="wrappe">
        <HelloWorld msg="第一次大作业展示" />
      </div>
  </main>
  </el-card>
  </div>
</template>
