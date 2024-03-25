<template>
    <div>
      <!-- Sequential Structure -->
      <h2>Sequential Structure:</h2>
      <transition name="fade">
        <p v-if="step === 1">This is the first step.</p>
        <p v-else-if="step === 2">This is the second step.</p>
        <p v-else-if="step === 3">This is the final step.</p>
      </transition>
      <el-button type="primary" @click="nextStep">Next Step</el-button>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        step: 1,
      };
    },
    methods: {
      nextStep() {
        if (this.step < 3) {
          this.step++;
        }
      },
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