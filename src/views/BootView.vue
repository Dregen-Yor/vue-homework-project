<!-- <template>
    <main class="flex items-center min-h-screen justify-center">
        <div>
            <img src="@/assets/CPU.svg">
        </div>
        <div>
            <el-scrollbar height="400px">
                <p v-for="msg in msgs" :key="msg">{{ msg }}</p>
            </el-scrollbar>
        </div>
    </main>
</template>
<script>
export default {
    name: 'BootView',
    data() {
        return {
            msgs: [
                "",
            ]
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false
        }, 3000)
    }
}
</script> -->

<template>
    <div >
      <el-button @click="startBios" :disabled="step !== 1">启动 BIOS</el-button>
      <el-button @click="startBootLoader" :disabled="step !== 2">启动 Boot Loader</el-button>
      <el-button @click="startOsKernel" :disabled="step !== 3">启动操作系统内核</el-button>
      <div class="flex justify-center"><img src="@/assets/CPU.svg"></div>
      <div>CPU 模式：{{ cpuMode }}</div>
      <div>内存状态：{{ memoryStatus }}</div>
      <div>
        <el-timeline>
          <el-timeline-item v-for="detail in details" :key="detail" :timestamp="now" placement="top">
            {{ detail }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <!-- ... -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cpuMode: '实模式',
        memoryStatus: '未初始化',
        step: 1,
        details: [

        ]
        // ...
      }
    },
    methods: {
      startBios() {
        this.cpuMode = '实模式';
        this.memoryStatus = 'BIOS 初始化';
        this.step++;
        this.details = ['CPU开始从一个固定的物理地址0x000ffff0开始执行代码。这个地址位于ROM BIOS的最顶端，占据了64KB的内存空间',
          'ROM BIOS是只读存储器中的基本输入输出系统，负责在计算机启动时进行硬件检测、初始化，并加载操作系统',
          '下一步设置中断描述符表，它告诉CPU当特定的中断发生（比如按下键盘上某个按键）时应该执行哪些代码'
        ];
      },
      startBootLoader() {
        this.cpuMode = '保护模式';
        this.memoryStatus = 'Boot Loader 初始化';
        this.step++;
        this.details = [

        ]
        // ...
      },
      startOsKernel() {
        this.memoryStatus = '操作系统内核初始化';
        this.step++;
        // ...
      }
    }
  }
  </script>