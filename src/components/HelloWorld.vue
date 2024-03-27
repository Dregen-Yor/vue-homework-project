<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
    <div class="greetings text-center ">
      <h1 class=" text-red-500">{{ msg }}</h1>
      <h3 class=" text-xl" ref="myText"></h3>
    </div>
  
</template>

<script>
export default {
  data() {
    return {
      text: "本次大作业是一个基于Vue3的前端项目，使用了Vite作为构建工具，使用了Vue Router进行页面路由管理，使用了TailwindCSS以及element ui进行页面样式设计，使用了GSAP进行动画制作。本项目同步发布于GitHub,供同学们参考，帮助了许多同学的页面制作，其中编译页面被多位同学参考。",
      index: 0,
    };
  },
  mounted() {
    const intervalId = setInterval(() => {
      if (this.index < this.text.length) {
        this.$refs.myText.textContent += this.text[this.index];
        this.index++;
      } else {
        clearInterval(intervalId);
      }
    }, 10); // Adjust speed here
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}


@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
    width: 60vh;
  }
}
</style>
