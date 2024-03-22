<template>
    <div>
      <h1>二进制原理</h1>
      <el-button type="primary" @click="show = !show">显示/隐藏内容</el-button>
      <transition name="fade">
        <el-card v-if="show">
          <p>在计算机中，所有的数据都是以二进制的形式存储的。整数和浮点数的存储方式有所不同。</p>
          <h2>整数（补码）</h2>
          <p>整数通常使用补码的形式存储。补码是一种可以表示正数和负数的二进制编码方式。对于正数，其补码就是其二进制表示；对于负数，其补码是其绝对值的二进制表示取反后加一。</p>
          <h2>浮点数</h2>
          <p>浮点数的存储方式比较复杂。它由三部分组成：符号位、指数和尾数。符号位表示浮点数的正负，指数表示浮点数的大小，尾数表示浮点数的精度。</p>
        </el-card>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>